import Express from "express";
import cors from "cors";
import morgan from "morgan";

import postRoutes from "./routes/post.routes";
import authRoutes from "./routes/auth.routes";

const app = Express();

app.use(morgan("dev"));
app.use(cors());
app.use(Express.json());

// Route handlers
app.use("/api", authRoutes, postRoutes);

export default app;
