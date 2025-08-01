import "reflect-metadata";
import { createServer } from "http";
import { port } from "../../config";
import Logger from "../../core/Logger";
import { connectToMasterDatabase } from "../../database/connectionDB/masterDBConnection";
import app from "./app";
import { container } from "../../core/container/container";
import { registerAllDependencies } from "../../core/container/registerAllDependencies";
import { initializeDatabases } from "../../core/database/database.service";
import { HandlerSubscriber } from "../../core/domainEvents/HandlerSubscriber";

connectToMasterDatabase()
  .then(async () => {
    registerAllDependencies();
    await initializeDatabases();
    const server = createServer(app);
    //SocketManager.initialize(server);
    container.get<HandlerSubscriber>("HandlerSubscriber").subscribeHandlers();
    server
      .listen(port, () => {
        Logger.info(`Server running on port: ${port} ✅`);
      })
      .on("error", e => Logger.error(e));

    //internalApp
      // .listen(internalPort, () => {
      //   Logger.info(`Internal server running on port: ${internalPort} ✅`);
      // })
      // .on("error", e => Logger.error(e));
  })
  .catch(error => {
    Logger.error("Failed to start the server: ", error);
    Logger.error(error);
    process.exit(1);
  });
