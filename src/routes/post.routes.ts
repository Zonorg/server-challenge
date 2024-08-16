import { Router } from "express";
import PostController from "../controllers/post.controller";

const router = Router();

router.get("/posts", PostController.getPosts);

router.post("/posts", PostController.createPost);

export default router;
