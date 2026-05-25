import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware";
import routes from "./routes";

export const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://rituals24-blue.vercel.app",
      "https://rituals-admin-panel.vercel.app",
      "https://rituals-pandit-panel.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Health check
app.get("/health", (_, res) => {
  res.status(200).send("OK");
});

app.use("/api", routes);
app.use(errorMiddleware);
