import dotenv from "dotenv";
import mongoose, { ClientSession } from "mongoose";
import { masterDBUri } from "../config";
import { initializeModels, tenantSchemas } from "../core/initializeModels";
import { NotFoundError } from "../core/ApplicationErrors";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { crudRepo } from "../database/repositories/crud.repo";
import { container } from "../core/container/container";

export const migrateDeletedUsersToArchived = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = (await schoolRepo.findAll()).filter(tenantDoc => tenantDoc.subdomain === "oist");

  if (schools.length === 0) throw new NotFoundError("tenant not found");

  await initializeSubdomains();

  for (const tenantDoc of schools) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getTenantCon(schoolSubdomain);

    const session: ClientSession = await connection.startSession();

    session.startTransaction();

    try {
      console.log("🚀 Working on", connection.name);
      initializeModels(connection, tenantSchemas);

      // initialize users archive statues

      await crudRepo(connection, "admin").updateMany(
        { isDeleted: false },
        { $set: { isArchived: false, archivedAt: null } },
      );

      await crudRepo(connection, "parent").updateMany(
        { isDeleted: false },
        { $set: { isArchived: false, archivedAt: null } },
      );

      await crudRepo(connection, "student").updateMany(
        { isDeleted: false },
        { $set: { isArchived: false, archivedAt: null } },
      );

      await crudRepo(connection, "teacher").updateMany(
        { isDeleted: false },
        { $set: { isArchived: false, archivedAt: null } },
      );

      // // delete documents

      const models = Object.keys(connection.models).filter(
        m =>
          m !== "message" &&
          m !== "conversation" &&
          m !== "messageAttachment" &&
          m !== "messageLinks",
      );

      for (const modelName of models) {
        console.log(modelName);

        //@ts-ignore
        await crudRepo(connection, modelName).hardDeleteMany({ isDeleted: true });
      }

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
};
dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    container.bind("MasterConnection").toConstantValue(mongoose.connection);
    await migrateDeletedUsersToArchived();
  })
  .catch(err => {
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
