import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

// Registro de usuario
export default class AuthController {
  public static registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      // Verificar si ya existe un usuario con el mismo correo
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Este usuario ya está registrado." });
      }

      // Encriptar contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Crear modelo de usuario
      const newUser = new User({
        username,
        password: hashedPassword,
      });

      // Guardar nuevo usuario
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // Login de usuario
  public static loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      console.log(username, password);
      // Verificar si el usuario existe
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Invalid username or password." });
      }
      // Verificar contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password." });
      }

      // Si todo es correcto, generar un status 200, unicamente para el login actual
      // Se pueden agregar tokens de inicio de sesión y otras funcionalidades
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
