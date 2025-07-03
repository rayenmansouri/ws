import { container } from "./../core/container/container";
import { crudRepo } from "./../database/repositories/crud.repo";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { NotFoundError } from "../core/ApplicationErrors";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { mongoSchoolModel } from "../newDatabase/mongo/schemas/school.schema";

export const initializeDescriptionForGTransactions = async () => {
  const tenantsDocs = (await mongoSchoolModel.find({})).filter(
    tenantDoc => tenantDoc.subdomain === "oist",
  );

  if (tenantsDocs.length === 0) throw new NotFoundError("tenant not found");
  await initializeSubdomains();
  for (const tenantDoc of tenantsDocs) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getTenantCon(schoolSubdomain);

    await crudRepo(connection, "transaction").updateMany(
      { description: { $exists: false } },
      {
        $set: { description: null },
      },
    );

    console.log("🚀 ~ Finish", connection.name);
  }
};

dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    container.bind("MasterConnection").toConstantValue(mongoose.connection);

    await initializeDescriptionForGTransactions();
  })
  .catch(err => {
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
