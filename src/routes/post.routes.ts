import { Router } from "express";
import PostController from "../controllers/post.controller";

const router = Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtiene todos los posts desde la API externa y los almacena en la base de datos
 *     parameters:
 *       - in: query
 *         name: _page
 *         schema:
 *           type: integer
 *         description: Número de página para la paginación
 *       - in: query
 *         name: _limit
 *         schema:
 *           type: integer
 *         description: Número máximo de posts a devolver por página
 *     responses:
 *       200:
 *         description: Lista de posts obtenidos y almacenados en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: 'Título del post'
 *                   body:
 *                     type: string
 *                     example: 'Contenido del post'
 *       500:
 *         description: Error en el servidor al obtener los posts
 */
router.get("/posts", PostController.getPosts);

/**
 * @swagger
 * /created-posts:
 *   get:
 *     summary: Obtiene todos los posts creados manualmente y almacenados en la base de datos
 *     responses:
 *       200:
 *         description: Lista de posts creados manualmente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: 'Título del post'
 *                   body:
 *                     type: string
 *                     example: 'Contenido del post'
 *       500:
 *         description: Error en el servidor al obtener los posts creados manualmente
 */
router.get("/created-posts", PostController.getCreatedPosts);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crea un nuevo post y lo almacena en la base de datos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 'Título del post'
 *               body:
 *                 type: string
 *                 example: 'Contenido del post'
 *     responses:
 *       201:
 *         description: Post creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: '63f4bfb12a4a3e4d3b0e1e2c'
 *                 title:
 *                   type: string
 *                   example: 'Título del post'
 *                 body:
 *                   type: string
 *                   example: 'Contenido del post'
 *       400:
 *         description: Error debido a campos faltantes en la solicitud
 *       500:
 *         description: Error en el servidor al crear el post
 */
router.post("/posts", PostController.createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Actualiza un post existente en la base de datos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del post a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 'Título actualizado del post'
 *               body:
 *                 type: string
 *                 example: 'Contenido actualizado del post'
 *     responses:
 *       200:
 *         description: Post actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: '63f4bfb12a4a3e4d3b0e1e2c'
 *                 title:
 *                   type: string
 *                   example: 'Título actualizado del post'
 *                 body:
 *                   type: string
 *                   example: 'Contenido actualizado del post'
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error en el servidor al actualizar el post
 */
router.put("/posts/:id", PostController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Elimina un post existente de la base de datos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del post a eliminar
 *     responses:
 *       200:
 *         description: Post eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Post eliminado exitosamente'
 *                 deletedPost:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: '63f4bfb12a4a3e4d3b0e1e2c'
 *                     title:
 *                       type: string
 *                       example: 'Título del post'
 *                     body:
 *                       type: string
 *                       example: 'Contenido del post'
 *       404:
 *         description: Post no encontrado
 *       500:
 *         description: Error en el servidor al eliminar el post
 */
router.delete("/posts/:id", PostController.deletePost);

export default router;
