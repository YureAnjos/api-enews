import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { validId } from "../middlewares/globals.middlewares.js";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", validId, userController.getById);
router.post("/", userController.create);
router.patch("/:id", validId, userController.update);

export default router;
