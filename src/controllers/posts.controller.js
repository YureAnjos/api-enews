import * as postsService from "../services/posts.service.js";
import { ErrorWS } from "../util/index.js";

export const getAll = async (req, res) => {
  try {
    const posts = await postsService.getAll(req.baseUrl, req.query);
    return res.status(200).send(posts);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};

export const getTop = async (req, res) => {
  try {
    const post = await postsService.getTop();
    return res.status(200).send(post);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const post = await postsService.getById(req.id);
    return res.status(200).send(post);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};

export const getByUser = async (req, res) => {
  try {
    const posts = await postsService.getByUser(req.userId);
    return res.status(200).send(posts);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const message = await postsService.create(req.userId, req.body);
    res.status(200).send(message);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const message = await postsService.update(req.id, req.body);
    res.status(200).send(message);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const message = await postsService.deletePost(req.id);
    res.status(200).send(message);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};

export const likeNews = async (req, res) => {
  try {
    const message = await postsService.likeNews(req.id, req.userId);
    res.status(200).send(message);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;

    if (!comment) throw new ErrorWS("Write a message to comment", 400);

    const message = await postsService.addComment(req.id, req.userId, comment);
    res.status(200).send(message);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId) throw new ErrorWS("Comment not found", 400);

    const message = await postsService.deleteComment(
      req.id,
      req.userId,
      commentId
    );
    res.status(200).send(message);
  } catch (error) {
    res.status(error.status || 500).send({ message: error.message });
  }
};
