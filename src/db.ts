import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};
