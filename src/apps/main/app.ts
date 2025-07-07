import cors from "cors";
import express from "express";
import { NotFoundError } from "../../core/ApplicationErrors";
import { default as Logger, default as logger } from "../../core/Logger";
import "../../core/sentry";
import { globalErrorHandlerMiddleware } from "./../../core/express/middlewares/errorHandler";
// import routes from "./index.routes";

process.on("uncaughtException", (e) => {
  Logger.error(e);
});

const app = express();

app.use(express.json());

app.use(cors());

// app.use(logRequest);

app.use("/api/v1" /*routes*/);

app.use((req, _, next) => {
  logger.fatal(`Route not found , ${req.path}`);
  next(new NotFoundError("Path not found"));
});

app.use(globalErrorHandlerMiddleware);

export default app;
