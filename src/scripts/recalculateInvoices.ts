import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { initializeModels, tenantSchemas } from "../core/initializeModels";
import { NotFoundError } from "../core/ApplicationErrors";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { crudRepo } from "../database/repositories/crud.repo";
import { container } from "../core/container/container";

export const reCalculateInvoices = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = (await schoolRepo.findAll()).filter(tenantDoc => tenantDoc.subdomain === "oist");

  if (schools.length === 0) throw new NotFoundError("tenant not found");
  await initializeSubdomains();
  for (const tenantDoc of schools) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getTenantCon(schoolSubdomain);

    console.log("🚀 Working on", connection.name);
    initializeModels(connection, tenantSchemas);

    const allInvoices = await crudRepo(connection, "invoice").findMany(
      {},
      { populateNested: { path: "students.student" } },
    );

    for (const invoice of allInvoices) {
      const totalServicesAmount = invoice.services.reduce((acc, service) => {
        return acc + service.amount * (1 - service.discount / 100);
      }, 0);

      const totalAmountAfterDiscount = parseFloat(
        (totalServicesAmount * (1 - invoice.discount / 100)).toFixed(2),
      );

      if (totalAmountAfterDiscount !== invoice.amount) {
        console.log(
          //@ts-ignore
          `Invoice with newId ${invoice.newId} of student ${invoice.students[0].student?.fullName} has wrong amount ${invoice.amount}. Correct amount is ${totalAmountAfterDiscount}`,
        );

        await crudRepo(connection, "invoice").updateOne(
          { _id: invoice._id },
          { amount: totalAmountAfterDiscount },
        );
      }
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
    await reCalculateInvoices();
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
