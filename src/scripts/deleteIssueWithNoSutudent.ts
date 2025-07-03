/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable no-console */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { NotFoundError } from "../core/ApplicationErrors";
import { container } from "../core/container/container";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { crudRepo } from "../database/repositories/crud.repo";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const tenantsDocs = await schoolRepo.findAll();
  if (tenantsDocs.length === 0) throw new NotFoundError("tenant not found");
  await initializeSubdomains();
  for (const tenantDoc of tenantsDocs) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getNewTenantConnection(schoolSubdomain);
    console.log("WORKING ON", schoolSubdomain);

    const issues = await crudRepo(connection, "issue").findMany(
      {},
      { populate: ["studentProfile"] },
    );

    const issuesWithNoStudent = issues.filter(issue => !issue.studentProfile);

    const issuesWithNoStudentIds = issuesWithNoStudent.map(issue => issue._id);

    await crudRepo(connection, "issue").hardDeleteMany({
      _id: { $in: issuesWithNoStudentIds },
    });
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
