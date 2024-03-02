import { Router } from "express";
import userRouter from "./user.route.js";
import postsRouter from "./posts.route.js";
import authRouter from "./auth.route.js";

const router = Router();

router.use("/user", userRouter);
router.use("/posts", postsRouter);
router.use("/auth", authRouter);

export default router;
