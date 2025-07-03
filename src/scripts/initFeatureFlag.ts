import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { FEATURE_FLAGS_ENUM } from "../feature/schools/constants/featureFlags";
import { mongoSchoolModel } from "../newDatabase/mongo/schemas/school.schema";

export const script = async () => {
  await mongoSchoolModel.updateMany(
    {},
    {
      featureFlags: {
        [FEATURE_FLAGS_ENUM.MESSAGES]: false,
        [FEATURE_FLAGS_ENUM.ANNOUNCEMENTS]: true,
      },
    },
  );
};

dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    container.bind("MasterConnection").toConstantValue(mongoose.connection);
    await script();
  })
  .catch(err => {
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
