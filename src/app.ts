import Express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import userRoutes from "./routes/user.routes";

const app = Express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(cors());
app.use(Express.json());
app.use(cookieParser());

// Route handlers
app.use("/api", userRoutes);

export default app;
