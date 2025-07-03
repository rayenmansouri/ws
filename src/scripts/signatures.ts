import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { registerAllDependencies } from "../core/container/registerAllDependencies";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();

  for (const school of schools) {
    const oldSchoolSignature = school.signature;

    await schoolRepo.updateOneById(school._id, {
      financeSignature: oldSchoolSignature,
      academicSignature: oldSchoolSignature,
    });
  }
};

dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    registerAllDependencies();
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
