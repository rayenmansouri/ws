import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { StudentProfile } from "../feature/students/domain/studentProfile.entity";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();

  for (const school of schools) {
    const childContainer = container.createChild();
    const schoolConnection = await getNewTenantConnection(school.subdomain);
    childContainer.bind("Connection").toConstantValue(schoolConnection);

    console.log(`Updating ${school.subdomain}...`);

    const studentProfileModel = schoolConnection.model<StudentProfile>("studentProfile");

    await studentProfileModel.updateMany({}, { isExceptionallyPromoted: false });
  }
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
