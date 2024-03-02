import { ErrorWS } from "../util/index.js";
import * as postsRepositories from "../repositories/posts.repositories.js";

const restructurePost = (post) => ({
  id: post._id,
  banner: post.banner,
  title: post.title,
  text: post.text,
  likes: post.likes,
  comments: post.comments,
  createdAt: post.createdAt,
  authorName: post.user.name,
  authorUsername: post.user.username,
  authorAvatar: post.user.avatar,
});

export const getAll = async (baseUrl, query) => {
  let { limit = 5, offset = 0, search } = query;
  limit = Number(limit);
  offset = Number(offset);

  const [posts, total] = await (!query
    ? Promise.all([
        postsRepositories.getAll(limit, offset),
        postsRepositories.getPostsCount(),
      ])
    : Promise.all([
        postsRepositories.search(search, limit, offset),
        postsRepositories.getPostsCount(),
      ]));

  const next = offset + limit;
  const nextUrl =
    next < total ? `${baseUrl}?limit=${limit}?offset=${next}` : null;

  const previous = offset - limit > 0 ? offset - limit : null;
  const previousUrl = previous
    ? `${baseUrl}?limit=${limit}?offset=${previous}`
    : null;

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,
    results: posts.map((post) => restructurePost(post)),
  };
};

export const getTop = async () => {
  const post = await postsRepositories.getTop();
  if (!post) throw new ErrorWS("Post not found", 400);

  return restructurePost(post);
};

export const getById = async (id) => {
  const post = await postsRepositories.getById(id);
  if (!post) throw new ErrorWS("Post not found", 400);

  return restructurePost(post);
};

export const getByUser = async (userId) => {
  const posts = await postsRepositories.getByUser(userId);

  return {
    results: posts.map((post) => restructurePost(post)),
  };
};

export const create = async (userId, body) => {
  const { title, text, banner } = body;
  if (!title || !text || !banner)
    throw new ErrorWS("Send all parameters to create a post", 400);

  await postsRepositories.create({ user: userId, title, text, banner });

  return { message: "Post created" };
};

export const update = async (id, body) => {
  const { title, text, banner } = body;

  if (!title || !text || !banner)
    throw new ErrorWS("Send at least one parameter to update a post", 400);

  const post = await postsRepositories.update(id, { title, text, banner });
  if (!post) throw new ErrorWS("Post not found", 400);

  return { message: "Post updated", post };
};

export const deletePost = async (id) => {
  const post = await postsRepositories.deletePost(id);
  if (!post) throw new ErrorWS("Post not found", 400);

  return { message: "Post successfully deleted" };
};

export const likeNews = async (id, userId) => {
  const post = await postsRepositories.likeNews(id, userId);
  if (!post) {
    await postsRepositories.deleteLike(id, userId);
    return { message: "Like successfully deleted" };
  }

  return { message: "Like successfully added" };
};

export const addComment = async (id, userId, comment) => {
  const post = await postsRepositories.addComment(id, userId, comment);
  if (!post) throw new ErrorWS("Post not found", 400);

  return { message: "Comment successfully added" };
};

export const deleteComment = async (id, userId, commentId) => {
  const post = await postsRepositories.deleteComment(id, userId, commentId);

  const comment = post.comments.find((comment) => comment.id == commentId);
  if (!comment) new ErrorWS("Comment not found", 400);

  if (String(comment.userId) !== String(userId))
    throw new Error("You can't delete this comment ", 400);

  return { message: "Comment successfully deleted" };
};
