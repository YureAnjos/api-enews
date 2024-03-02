import Post from "../models/Post.js";

export const getPostsCount = () => {
  return Post.countDocuments();
};
export const getAll = (limit, offset) => {
  return Post.find({})
    .limit(limit)
    .skip(offset)
    .sort({ _id: -1 })
    .populate("user");
};
export const getTop = () => {
  return Post.findOne().sort({ _id: -1 }).populate("user");
};
export const getById = (id) => {
  return Post.findById(id).populate("user");
};
export const getByUser = (userId) => {
  return Post.find({ user: userId }).sort({ _id: -1 }).populate("user");
};

export const search = (query, limit, offset) => {
  return Post.find({
    title: { $regex: `${query || ""}`, $options: "i" },
  })
    .limit(limit)
    .skip(offset)
    .sort({ _id: -1 })
    .populate("user");
};

export const create = (parameters) => {
  return Post.create(parameters);
};
export const deletePost = (id) => {
  return Post.findOneAndDelete({ _id: id });
};
export const update = (id, parameters) => {
  return Post.findOneAndUpdate({ _id: id }, parameters, { rawResult: true });
};

// nin: https://www.mongodb.com/docs/manual/reference/operator/query/nin/
export const likeNews = (id, userId) => {
  return Post.findOneAndUpdate(
    { _id: id, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, createdAt: new Date() } } }
  );
};
export const deleteLike = (id, userId) => {
  return Post.findOneAndUpdate({ _id: id }, { $pull: { likes: { userId } } });
};

export const addComment = (id, userId, comment) => {
  const commentId = Math.floor(Date.now() * Math.random()).toString(36);

  return Post.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        comments: {
          id: commentId,
          userId,
          text: comment,
          createdAt: new Date(),
        },
      },
    }
  );
};
export const deleteComment = (id, userId, commentId) => {
  return Post.findOneAndUpdate(
    { _id: id },
    {
      $pull: {
        comments: {
          id: commentId,
          userId,
        },
      },
    }
  );
};
