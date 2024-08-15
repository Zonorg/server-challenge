import mongoose, { Schema } from "mongoose";

interface IPost {
  id: number;
  title: string;
  body: string;
}

const postSchema = new Schema<IPost>({
  id: { type: Number },
  title: { type: String },
  body: { type: String },
});

export const Post = mongoose.model<IPost>("Post", postSchema);

export { IPost };
