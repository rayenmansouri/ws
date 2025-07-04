import cors from "cors";
import express from "express";
import { NotFoundError } from "../../core/ApplicationErrors";
import { globalErrorHandlerMiddleware } from "../../core/express/middlewares/errorHandler";
import { default as logger } from "../../core/Logger";
import "../../core/sentry";
// import { logRequest } from "../../middlewares/logRequest";
// import { internalRouter } from "./index.routes";

export const internalApp = express();

internalApp.use(express.json());
internalApp.use(cors());

// internalApp.use(logRequest);

// internalApp.use("/api/internal", internalRouter);

// Sentry.setupExpressErrorHandler(internalApp, {
//   shouldHandleError: (err: unknown) => {
//     if (err instanceof InternalError) return true;
//     if (err instanceof ApplicationError) return false;

//     return true;
//   },
// });

internalApp.use((req, _, next) => {
  logger.fatal(`Route not found , ${req.path}`);
  next(new NotFoundError("Path not found"));
});

internalApp.use(globalErrorHandlerMiddleware);
