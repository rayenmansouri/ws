import "../../core/sentry";
import cors from "cors";
import express from "express";
import path from "path";
import { default as Logger, default as logger } from "../../core/Logger";
import { ApplicationError, InternalError, NotFoundError } from "../../core/ApplicationErrors";
import { errorHandler } from "../../middlewares/errorHandler";
import { logRequest } from "../../middlewares/logRequest";
import routes from "./index.routes";
import * as Sentry from "@sentry/node";

process.on("uncaughtException", e => {
  Logger.error(e);
});

const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(logRequest);

// Register core middleware before routes

app.use("/api/v1", routes);

Sentry.setupExpressErrorHandler(app, {
  shouldHandleError: (err: unknown) => {
    if (err instanceof InternalError) return true;
    if (err instanceof ApplicationError) return false;

    return true;
  },
});

app.use((req, _, next) => {
  logger.fatal(`Route not found , ${req.path}`);
  next(new NotFoundError("Path not found"));
});

app.use(errorHandler);

export default app;
