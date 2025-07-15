import cors from "cors";
import express from "express";
import { NotFoundError } from "../../core/ApplicationErrors";
import { errorHandler } from "../../middlewares/errorHandler";
import { logRequest } from "../../middlewares/logRequest";
import routes from "./routes";
import logger from "../../core/Logger";

process.on("uncaughtException", e => {
  logger.error(e);
});

const app = express();

app.use(express.json());
app.use(cors());

app.use(logRequest);

app.use("/api", routes);

app.use((_, __, next) => {
  next(new NotFoundError("Path not found"));
});

app.use(errorHandler);

export default app;
