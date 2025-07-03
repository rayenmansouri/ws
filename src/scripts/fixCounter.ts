import dotenv from "dotenv";
import mongoose, { Connection } from "mongoose";
import { masterDBUri } from "../config";
import { tenantSchemas } from "../core/initializeModels";
import { NotFoundError } from "../core/ApplicationErrors";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { entityInterfaces } from "../database/entityInterfaces";
import { crudRepo } from "../database/repositories/crud.repo";
import { getScriptArgs } from "../helpers/getScriptArgs";
import { mongoSchoolModel } from "../newDatabase/mongo/schemas/school.schema";
import { container } from "../core/container/container";

export const addIssueReason = async () => {
  const tenantsDocs = await mongoSchoolModel.find({});
  // .filter(
  //   tenantDoc => tenantDoc.subdomain === "oist",
  // );

  if (tenantsDocs.length === 0) throw new NotFoundError("tenant not found");
  await initializeSubdomains();
  for (const tenantDoc of tenantsDocs) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getTenantCon(schoolSubdomain);

    const collectionModelMap: Record<collectionName, modelName> = {};
    Object.entries(tenantSchemas).forEach(([entity, schema]) => {
      mongoose.plugin(schema => {
        if (schema.path("updatedAt")) {
          schema.path("updatedAt").select(false);
        }
      });
      const model = connection.model(entity, schema);

      if (entity === "counter") return;
      collectionModelMap[entity] = model.collection.name;
    });

    const promise: Promise<void>[] = [];

    for (const [collectionName, modelName] of Object.entries(collectionModelMap)) {
      promise.push(
        fixCounterInCollection(connection, collectionName as keyof entityInterfaces, modelName),
      );
    }

    await Promise.all(promise);

    console.log("🚀 ~ Finish", connection.name);
  }
};

const fixCounterInCollection = async (
  connection: Connection,
  collectionName: keyof entityInterfaces,
  modeName: string,
) => {
  const docs = await crudRepo(connection, collectionName).aggregation([
    { $addFields: { numericValue: { $toInt: "$newId" } } },
    { $group: { _id: collectionName, maxNumber: { $max: "$numericValue" } } },
  ]);

  //? if no document in that collection the default is 0
  const maxNewId: number = docs[0]?.maxNumber || 0;

  const counter = await crudRepo(connection, "counter").findOne({
    collectionName: modeName,
  });

  const newCounter = Math.max(maxNewId, counter.count);

  console.log("Collection Name", collectionName);
  console.log("Old Counter", counter.count);
  console.log("New Counter", newCounter);

  if (counter.count === newCounter) return;

  const disallowUpdate = getScriptArgs()[0];

  if (!disallowUpdate) {
    await crudRepo(connection, "counter").updateOne(
      { collectionName: counter.collectionName },
      { count: newCounter },
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
    await addIssueReason();
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
