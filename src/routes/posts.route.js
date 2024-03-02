import { Router } from "express";
import * as postsController from "../controllers/posts.controller.js";
import { isAuthorized, validId } from "../middlewares/globals.middlewares.js";

const router = Router();

router.get("/", postsController.getAll);
router.get("/top", postsController.getTop);

router.get("/:id", validId, postsController.getById);

router.get("/user", isAuthorized, postsController.getByUser);
router.post("/", isAuthorized, postsController.create);
router.delete("/:id", isAuthorized, validId, postsController.deletePost);
router.patch("/:id", isAuthorized, validId, postsController.update);
router.patch("/like/:id", isAuthorized, validId, postsController.likeNews);
router.patch("/comment/:id", isAuthorized, validId, postsController.addComment);
router.patch(
  "/comment/:id/:commentId",
  isAuthorized,
  validId,
  postsController.deleteComment
);

export default router;
