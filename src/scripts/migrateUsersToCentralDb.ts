//@ts-nocheck
import { container } from "./../core/container/container";
import { mongoSchoolModel } from "./../newDatabase/mongo/schemas/school.schema";
import dotenv from "dotenv";
import mongoose, { FilterQuery } from "mongoose";
import { centralDBUri, masterDBUri } from "../config";
import { centralDBSchemas, initializeModels, tenantSchemas } from "../core/initializeModels";
import { NotFoundError } from "../core/ApplicationErrors";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { crudRepo } from "../database/repositories/crud.repo";
import { deprecate } from "util";
import { BaseUser } from "../feature/users/domain/baseUser.entity";

const collectionNamesForCounter = {
  student: "students",
  parent: "parents",
  teacher: "teachers",
  admin: "admins",
};

const collectionNames: "student"[] = ["student"];

const showLoader = (message): void => {
  process.stdout.write(`\x1b[1A\x1b[0K${message} `);
  process.stdout.write("⏳");
  setTimeout(() => process.stdout.write("\x1b[0G"), 500);
};

const initializeReasonForCanceling = async (): void => {
  showLoader("Fetching tenant documents...");

  const tenantsDocs = (await mongoSchoolModel.find()).filter(
    tenantDoc => tenantDoc.subdomain === "oist",
  );

  if (tenantsDocs.length === 0) throw new NotFoundError("Tenant not found");

  await initializeSubdomains();
  const centralDatabaseConnection = mongoose.createConnection(centralDBUri);
  initializeModels(centralDatabaseConnection, centralDBSchemas);

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    for (const tenantDoc of tenantsDocs) {
      const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
      const connection = await getTenantCon(schoolSubdomain);
      console.log(`🚀 Working on ${connection.name}...`);
      initializeModels(connection, tenantSchemas);

      const bulkOps = {
        students: [],
        parents: [],
        teachers: [],
        admins: [],
      };

      const accountsThatPreventMigration = [];
      for (const entity of collectionNames) {
        showLoader(`Processing ${entity} collection...`);

        const entitiesDocuments = await crudRepo(connection, entity).findMany({});

        for (const doc of entitiesDocuments) {
          const { email, phoneNumber } = doc;
          const query: FilterQuery<BaseUser> = {
            $or: [],
          };

          if (email != undefined) query.$or.push({ email });

          if (phoneNumber != undefined) query.$or.push({ phoneNumber });

          const existingDocument = query.$or?.length
            ? await crudRepo(centralDatabaseConnection, entity).findOne(query)
            : null;

          if (!existingDocument) {
            const centralUser = {
              email: doc.email || undefined,
              phoneNumber: doc.phoneNumber || undefined,
              userId: doc._id,
              newId: `${tenantDoc.newId}.${doc.newId}`,
              tenantId: tenantDoc._id,
            };
            bulkOps[collectionNamesForCounter[entity]].push({
              insertOne: { document: centralUser },
            });
            console.log(`📝 Prepared to insert document into ${entity} with email ${email}`);
          } else {
            const accountThatPreventMigration = {
              stringifiedDocument: doc,
              tenantName: tenantDoc.name,
              tenantId: tenantDoc._id.toString(),
            };
            console.log({ accountThatPreventMigration });

            accountsThatPreventMigration.push(accountThatPreventMigration);
            console.error(`⚠️ Duplicate found for document ${doc._id.toString()} in ${entity}`);
          }
        }
      }
      for (const [entity, ops] of Object.entries(bulkOps)) {
        if (ops.length > 0) {
          let entityToBulk = collectionNamesForCounter[entity];
          if (entity === "students") entityToBulk = "student";
          if (entity === "parents") entityToBulk = "parent";
          if (entity === "teachers") entityToBulk = "teacher";
          if (entity === "admins") entityToBulk = "admin";

          showLoader(`Inserting documents into ${entityToBulk} collection...`);
          console.log({ accountsThatPreventMigration });

          if (accountsThatPreventMigration.length > 0) {
            let details = "";
            accountsThatPreventMigration.forEach(
              account => (details = `${details} + '/n'+${JSON.stringify(account, null, 2)}`),
            );
            throw new Error(`Fix accounts duplication before running migration :  ` + details);
          }
          await crudRepo(centralDatabaseConnection, entityToBulk).bulkWrite(ops, session);
        }
      }

      console.log(`✅ Migration committed successfully for tenant ${tenantDoc._id}`);
    }
    await session.commitTransaction();
  } catch (error) {
    console.log(error);

    console.log(`🛑 Aborting migration for tenant ..`);
    await session.abortTransaction();
    console.log(`🚫 Migration aborted for tenant`);
  } finally {
    await session.endSession();
  }
};

dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    console.log("🔄 Starting migration process...");
    container.bind("MasterConnection").toConstantValue(mongoose.connection);
    await initializeReasonForCanceling();
  })
  .catch(err => {
    console.error("🔴 Master DB connection error:", err);
  })
  .finally(async () => {
    await mongoose.disconnect();
    console.log("✔️ Process completed.");
    process.exit(0);
  });
