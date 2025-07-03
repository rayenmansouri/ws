import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";

export const scripts = async () => {
  const connection = container.get("MasterConnection");

  const test = await connection.model("schools").updateMany(
    { schedule: { $exists: false } },
    {
      schedule: {
        startHour: 8,
        endHour: 18,
        days: [1, 2, 3, 4, 5, 6],
      },
    },
  );
  console.log("🚀 ~ scripts ~ connection:", connection.name);
  console.log("🚀 ~ scripts ~ test:", test);
};

dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    container.bind("MasterConnection").toConstantValue(mongoose.connection);
    await scripts();
  })
  .catch(err => {
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });

type collectionName = string;
type modelName = string;
