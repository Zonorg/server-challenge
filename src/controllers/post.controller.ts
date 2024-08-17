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

  // Obtener todos los posts creados manualmente
  public static getCreatedPosts = async (req: Request, res: Response) => {
    try {
      const createdPosts = await Post.find({ created: true });
      res.status(200).json(createdPosts);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // Crear un nuevo post
  public static createPost = async (req: Request, res: Response) => {
    try {
      const { title, body } = req.body;
      if (!title || !body) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }
      const post = new Post({ title, body, created: true });
      const savedPost = await post.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // Eliminar un post
  public static deletePost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedPost = await Post.findByIdAndDelete(id);

      if (!deletedPost) {
        return res.status(404).json({ message: "Post no encontrado" });
      }

      res.status(200).json({ message: "Post eliminado exitosamente", deletedPost });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el post", error });
    }
  };

  // Editar un post
  public static updatePost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, body } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(id, { title, body }, { new: true });

      if (!updatedPost) {
        return res.status(404).json({ message: "Post no encontrado" });
      }

      res.status(200).json({ message: "Post actualizado exitosamente", updatedPost });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el post", error });
    }
  };
}
