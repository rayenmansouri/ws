import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { mongoAppVersionSchema } from "../newDatabase/mongo/schemas/AppVersion.schema";
import { APP_PLATFORM_ENUM } from "../feature/masters/domain/AppVersion.entity";

export const initializeMobileAppsVersions = async () => {
  const appVersionModel = mongoose.model("appVersion", mongoAppVersionSchema);

  await appVersionModel.create([
    {
      version: "1.0.0",
      os: APP_PLATFORM_ENUM.ANDROID,
    },
    {
      version: "1.0.0",
      os: APP_PLATFORM_ENUM.IOS,
    },
  ]);
};
dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    container.bind("MasterConnection").toConstantValue(mongoose.connection);

    await initializeMobileAppsVersions();
  })
  .catch(err => {
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
