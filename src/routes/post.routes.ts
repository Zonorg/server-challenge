import { Router } from "express";
import PostController from "../controllers/post.controller";

const router = Router();

router.get("/posts", PostController.getPosts);

export default router;
