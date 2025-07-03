import * as Sentry from "@sentry/node";
import cors from "cors";
import express from "express";
import {
  ApplicationError,
  InternalError,
  NotFoundError,
} from "../../core/ApplicationErrors";
import { default as logger } from "../../core/Logger";
import "../../core/sentry";
import { errorHandler } from "../../middlewares/errorHandler";
import { logRequest } from "../../middlewares/logRequest";
// import { internalRouter } from "./index.routes";

export const internalApp = express();

internalApp.use(express.json());
internalApp.use(cors());

internalApp.use(logRequest);

// internalApp.use("/api/internal", internalRouter);

Sentry.setupExpressErrorHandler(internalApp, {
  shouldHandleError: (err: unknown) => {
    if (err instanceof InternalError) return true;
    if (err instanceof ApplicationError) return false;

    return true;
  },
});

internalApp.use((req, _, next) => {
  logger.fatal(`Route not found , ${req.path}`);
  next(new NotFoundError("Path not found"));
});

internalApp.use(errorHandler);
