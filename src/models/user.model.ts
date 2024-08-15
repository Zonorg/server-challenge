import mongoose, { Schema } from "mongoose";

interface IUser {
  name: string;
  username: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
});

export const User = mongoose.model<IUser>("User", userSchema);

export { IUser };
