import { Request, Response } from "express";
import axios from "axios";

import { IUser } from "../models/user";

export default class UserController {
  /**
   * Get Users.
   */
  public static getUsers = async (req: Request, res: Response) => {
    try {
      const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
