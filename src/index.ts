import dotenv from "dotenv";
dotenv.config();
import { connectDb } from "./db";

connectDb();
import app from "./app";
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
