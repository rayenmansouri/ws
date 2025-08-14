import "reflect-metadata";
import { createServer } from "http";
import { port } from "../../config";
import Logger from "../../core/Logger";
import { connectToMasterDatabase } from "../../database/connectionDB/masterDBConnection";
import app from "./app";
import { registerAllDependencies } from "../../core/container/registerAllDependencies";
import { initializeDatabases } from "../../core/database/database.service";


async function bootstrap(): Promise<void> {
  registerAllDependencies();
  await initializeDatabases();
}

connectToMasterDatabase()
  .then(async () => {
    await bootstrap();
    const server = createServer(app);
    // TODO: Initialize socket manager when needed
    // SocketManager.initialize(server);
    // TODO: Subscribe to domain event handlers when implemented
    // container.get<HandlerSubscriber>("HandlerSubscriber").subscribeHandlers();
    
    server
      .listen(port, () => {
        Logger.info(`Server running on port: ${port} ✅`);
      })
      .on("error", e => Logger.error(e));
  })
  .catch(error => {
    Logger.error("Failed to start the server: ", error);
    Logger.error(error);
    process.exit(1);
  });
