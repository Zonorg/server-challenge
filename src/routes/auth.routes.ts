import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: 'johndoe'
 *               password:
 *                 type: string
 *                 example: 'password123'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: '64a9d14e5d4f5c1b3d2e7a1e'
 *                 username:
 *                   type: string
 *                   example: 'johndoe'
 *       400:
 *         description: El usuario ya está registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Este usuario ya está registrado.'
 *       500:
 *         description: Error en el servidor al registrar el usuario
 */
router.post("/register", AuthController.registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión de un usuario existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: 'johndoe'
 *               password:
 *                 type: string
 *                 example: 'password123'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Login successful'
 *       400:
 *         description: Nombre de usuario o contraseña inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Invalid username or password.'
 *       500:
 *         description: Error en el servidor al iniciar sesión
 */
router.post("/login", AuthController.loginUser);

export default router;
