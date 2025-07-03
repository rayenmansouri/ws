import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { NotFoundError } from "../core/ApplicationErrors";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { MongoAdminRepo } from "../newDatabase/mongo/repositories/MongoAdmin.repo";
import { mongoSchoolModel } from "../newDatabase/mongo/schemas/school.schema";

export const initAdminImpersonation = async () => {
  const schools = (await mongoSchoolModel.find()).filter(
    tenantDoc => tenantDoc.subdomain === "oist",
  );
  if (schools.length === 0) throw new NotFoundError("tenant not found");

  await initializeSubdomains();
  for (const tenantDoc of schools) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getNewTenantConnection(schoolSubdomain);

    console.log("🚀 Working on", tenantDoc.name);

    const adminRepo = new MongoAdminRepo(connection, null);
    const allAdmins = await adminRepo.findAll();

    for (const admin of allAdmins) {
      if (!admin.isImpersonation)
        await adminRepo.updateOneById(admin._id, { isImpersonation: false });
    }

    console.log(`✅ Updated ${allAdmins.length} admins in ${tenantDoc.name}`);
  }
};

dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    container.bind("MasterConnection").toConstantValue(mongoose.connection);
    await initAdminImpersonation();
  })
  .catch(err => {
    console.log(err);
    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
