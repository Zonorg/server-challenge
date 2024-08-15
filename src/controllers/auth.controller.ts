import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

// Registro de usuario
export default class AuthController {
  public static registerUser = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    try {
      // Verificar si ya existe un usuario con el mismo correo
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        return res.status(400).json({ message: "User with this email or username already exists." });
      }

      // Encriptar contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Crear modelo de usuario
      const newUser = new User({
        email,
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
}
