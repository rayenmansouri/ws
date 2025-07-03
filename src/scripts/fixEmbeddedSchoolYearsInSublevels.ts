import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { NotFoundError } from "../core/ApplicationErrors";
import { container } from "../core/container/container";
import { initializeModels, tenantSchemas } from "../core/initializeModels";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { crudRepo } from "../database/repositories/crud.repo";
import { registerAllDependencies } from "../core/container/registerAllDependencies";

export const script = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const tenantsDocs = await schoolRepo.findAll();

  if (tenantsDocs.length === 0) throw new NotFoundError("tenant not found");
  await initializeSubdomains();
  for (const tenantDoc of tenantsDocs) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getTenantCon(schoolSubdomain);
    initializeModels(connection, tenantSchemas);

    console.log("🚀 ~ Working on", connection.name);

    const allSublevels = await crudRepo(connection, "subLevel").findMany({});

    for (const subLevel of allSublevels) {
      const currentSchoolYear = await crudRepo(connection, "schoolYear").findOne({
        _id: subLevel.level.currentSchoolYear._id,
      });
      await crudRepo(connection, "subLevel").updateOne(
        {
          _id: subLevel._id,
        },
        {
          $set: {
            "level.currentSchoolYear": currentSchoolYear,
          },
        },
      );
    }
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
