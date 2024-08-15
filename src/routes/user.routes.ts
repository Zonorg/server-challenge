import { Router } from "express";
import UserController from "../controllers/user.controllers";

const router = Router();

router.get("/users", UserController.getUsers);

export default router;
