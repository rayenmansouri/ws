import mongoose from "mongoose";
import { centralDBUri } from "../../config";
import { centralDBSchemas, initializeModels } from "../../core/initializeModels";
import Logger from "../../core/Logger";

export let centralDatabaseConnection: mongoose.Connection;

export const connectToCentralDatabase = async (): Promise<void> => {
  mongoose.set("strictQuery", false);
  mongoose.set("strictPopulate", false);

  try {
    centralDatabaseConnection = mongoose.createConnection(centralDBUri);
    Logger.info(`Central DB connection established ✅`);

    initializeModels(centralDatabaseConnection, centralDBSchemas);
  } catch (error) {
    Logger.info("Central DB connection error ⛔️");
    Logger.error(String(error));
    process.exit(0);
  }

  centralDatabaseConnection?.on("disconnected", () => {
    Logger.info("Central DB connection disconnected");
    process.exit(0);
  });

  process.on("SIGINT", () => {
    centralDatabaseConnection?.close().then(() => {
      Logger.info("Central DB connection disconnected through app termination");
      process.exit(0);
    });
  });
};
