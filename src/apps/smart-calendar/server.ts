import "reflect-metadata";
import Logger from "../../core/Logger";
import app from "./app";
import { port } from "../../config";
import { FetProcessManager } from "./FetProcessManager";

app.listen(port, () => {
  Logger.info(`server running on port : ${port} ✅`);
});

export const fetProcessManager = new FetProcessManager();
