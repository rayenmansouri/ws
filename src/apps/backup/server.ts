import "reflect-metadata";
import app from "./app";
import Logger from "../../core/Logger";
import { port } from "../../config";
import { initializeBackupCron } from "../../crons/initializeBackupCron";
import { connectToMasterDatabase } from "../../database/connectionDB/masterDBConnection";
import { registerAllDependencies } from "../../core/container/registerAllDependencies";

connectToMasterDatabase()
  .then(async () => {
    registerAllDependencies();

    await initializeBackupCron();

    app
      .listen(port, () => {
        Logger.info(`server running on port : ${port} ✅`);
      })
      .on("error", e => Logger.error(e));
  })
  .catch(e => Logger.error(e));
