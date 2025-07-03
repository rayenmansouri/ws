import cors from "cors";
import express from "express";
import Logger from "../../core/Logger";
import { errorHandler } from "../../middlewares/errorHandler";
import { logRequest } from "../../middlewares/logRequest";
import routes from "./routes";
import { NotFoundError } from "../../core/ApplicationErrors";

process.on("uncaughtException", e => {
  Logger.error(e.message + e.stack);
});

const app = express();

app.use(express.json());
app.use(cors());

// app.use(gatherMetrics);

app.use(logRequest);

app.use("/api/v1", routes);

// app.get('/metrics', exposeMetrics);

app.use((_, __, next) => next(new NotFoundError("Path not found")));

app.use(errorHandler);

export default app;
