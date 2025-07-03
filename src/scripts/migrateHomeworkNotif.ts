/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/only-throw-error */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { initializeModels, tenantSchemas } from "../core/initializeModels";
import { NotFoundError } from "../core/ApplicationErrors";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { crudRepo } from "./../database/repositories/crud.repo";
import { NOTIFICATION_TYPES_ENUM } from "./../features/notification/constants/constants";

export const migrateHomeworkNotification = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const tenantsDocs = (await schoolRepo.findAll()).filter(
    tenantDoc => tenantDoc.subdomain === "oist",
  );
  if (tenantsDocs.length === 0) throw new NotFoundError("tenant not found");
  await initializeSubdomains();
  for (const tenantDoc of tenantsDocs) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getTenantCon(schoolSubdomain);

    console.log("🚀 Working on", connection.name);
    initializeModels(connection, tenantSchemas);

    const parentHomeworksNotification = await crudRepo(connection, "notification").findMany({
      userType: "parent",
      topic: "homework",
    });

    const studentHomeworksNotification = await crudRepo(connection, "notification").findMany({
      userType: "student",
      topic: "homework",
    });

    const parentHomeworksNotificationIds = parentHomeworksNotification.map(notification =>
      notification._id.toString(),
    );

    const studentHomeworksNotificationIds = studentHomeworksNotification.map(notification =>
      notification._id.toString(),
    );

    await crudRepo(connection, "notification").updateMany(
      {
        _id: { $in: parentHomeworksNotificationIds },
      },
      {
        topic: NOTIFICATION_TYPES_ENUM.PARENT_HOMEWORK,
      },
    );

    await crudRepo(connection, "notification").updateMany(
      {
        _id: { $in: studentHomeworksNotificationIds },
      },
      {
        topic: NOTIFICATION_TYPES_ENUM.STUDENT_HOMEWORK,
      },
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
    await migrateHomeworkNotification();
  })
  .catch(err => {
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
