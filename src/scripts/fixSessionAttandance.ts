import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { SESSION_STATUS_ENUM } from "../database/schema/pedagogy/session/session.schema";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();

  for (const school of schools) {
    const childContainer = container.createChild();
    const connection = await getTenantCon(school.subdomain);
    childContainer.bind("Connection").toConstantValue(connection);

    await connection
      .model("session")
      .updateMany(
        { status: SESSION_STATUS_ENUM.WAITING, attendance: { $exists: false } },
        { $set: { attendance: {} } },
      );
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
