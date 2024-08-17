import { Router } from "express";
import PostController from "../controllers/post.controller";

const router = Router();

router.get("/posts", PostController.getPosts);

router.get("/created-posts/", PostController.getCreatedPosts);

router.post("/posts", PostController.createPost);

router.delete("/posts/:id", PostController.deletePost)


export default router;
