/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable no-console */
import dotenv from "dotenv";
import mongoose, { ObjectId } from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { NotFoundError } from "../core/ApplicationErrors";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { IHomework } from "../database/schema/pedagogy/Performance/homework.schema";
import { HOMEWORK_STATUS_ENUM } from "../features/homework/constants/shared/addHomework.constants";
import { isIdsEqual } from "../helpers/functionsUtils";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");

  const tenantsDocs = (await schoolRepo.findAll()).filter(
    tenantDoc => tenantDoc.subdomain === "oist",
  );
  mongoose.set("strictPopulate", false);
  if (tenantsDocs.length === 0) throw new NotFoundError("tenant not found");
  await initializeSubdomains();
  for (const tenantDoc of tenantsDocs) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    console.log("WORKING ON", schoolSubdomain);
    const connection = await getNewTenantConnection(schoolSubdomain);
    const homeworks = (await connection
      .model("homework")
      .find({ status: HOMEWORK_STATUS_ENUM.TODO })
      .lean()) as unknown as (IHomework & { sessionToDo: ObjectId | undefined })[];

    const sessionIds = homeworks
      .map(homework => homework.sessionToDo)
      .filter(sessionToDo => !!sessionToDo);

    const sessions = await connection
      .model("session")
      .find({ _id: { $in: sessionIds } })
      .lean();

    const homeworkPayload: Partial<IHomework>[] = [];

    let count = 0;
    const homeworkNewIdsWithNoSessionToDo: string[] = [];
    for (const homework of homeworks) {
      const sessionToDo = sessions.find(session =>
        isIdsEqual(session._id as string, homework.sessionToDo),
      );
      if (sessionToDo) {
        homeworkPayload.push({
          ...homework,
          dueDate: homework.dueDate || sessionToDo.startTime,
        });
      } else {
        count++;
        homeworkPayload.push({ ...homework, dueDate: new Date() });
        homeworkNewIdsWithNoSessionToDo.push(homework.newId);
      }
    }

    console.log("🚀 ~ homeworkNewIdsWithNoSessionToDo:", homeworkNewIdsWithNoSessionToDo);
    console.log(`${count} homeworks have no sessionToDo`);

    await Promise.all(
      homeworkPayload.map(homework =>
        connection
          .model("homework")
          .updateOne({ _id: homework._id }, { dueDate: homework.dueDate }),
      ),
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
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
