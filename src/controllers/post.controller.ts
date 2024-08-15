import { Request, Response } from "express";
import axios from "axios";

import { Post, IPost } from "../models/post.model";

export default class PostsController {
  // Obtener todos los usuarios
  public static getPosts = async (req: Request, res: Response) => {
    try {
      const { _page, _limit } = req.query;
      const response = await axios.get<IPost[]>(
        `https://jsonplaceholder.typicode.com/posts?_page=${_page}&_limit=${_limit}`
      );
      const posts = response.data;

      // Filtrar los posts que ya existan en la base de datos
      const existingPosts = await Post.find();
      const filteredPosts = posts.filter((post) => !existingPosts.some((existingPost) => existingPost.id === post.id));

      // Insertar los posts filtrados en la base de datos
      await Post.insertMany(filteredPosts);

      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
