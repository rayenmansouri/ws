import mongoose from "mongoose";
import Logger from "../../core/Logger";
import { masterDabaseUri } from "../../configs/database.config";

export const connectToMasterDatabase = async (
  ...callBackFunctions: (() => Promise<void>)[]
): Promise<void> => {
  mongoose.set("strictQuery", false);
  mongoose.set("strictPopulate", false);

  try {
    await mongoose.connect(masterDabaseUri);
    Logger.info(`Master db connection done ✅`);
    if (callBackFunctions.length > 0) {
      for (let i = 0; i < callBackFunctions.length; i++) {
        await callBackFunctions[i]();
      }
    }
  } catch (error) {
    Logger.info("Master db connection error ⛔️");
    Logger.error(String(error));
    process.exit(0);
  }

  mongoose.connection.on("disconnected", () => {
    Logger.info("Master db connection disconnected");
    process.exit(0);
  });

  process.on("SIGINT", () => {
    mongoose.connection.close().then(() => {
      Logger.info("Master db connection disconnected through app termination");
      process.exit(0);
    });
  });
};
