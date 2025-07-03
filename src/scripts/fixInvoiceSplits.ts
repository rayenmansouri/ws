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
    console.log("Working on ", tenantDoc.name);

    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getTenantCon(schoolSubdomain);

    initializeModels(connection, tenantSchemas);

    const invoices = await crudRepo(connection, "invoice").findMany(
      {
        paymentSplits: {
          $elemMatch: {
            status: "paid",
            paidAt: { $exists: false },
          },
        },
      },
      {
        select: { updatedAt: "1" },
      },
    );

    for (const invoice of invoices) {
      console.log(invoice);

      const splitPaymentNotifications = await crudRepo(connection, "notification").findMany({
        "details.invoiceNewId": invoice.newId,
        topic: "invoice_split_payment_success",
      });
      if (splitPaymentNotifications.length === 0) {
        console.log(
          "invoice split is paid but there is no notification found newId = ",
          invoice.newId,
        );
        let index = 0;
        for (const split of invoice.paymentSplits) {
          if (split.status === "paid") {
            await crudRepo(connection, "invoice").updateOne(
              {
                _id: invoice._id,
              },
              {
                $set: {
                  [`paymentSplits.${index}.paidAt`]: invoice.updatedAt,
                },
              },
            );
          }
          index++;
        }
      } else {
        const sortedNotification = splitPaymentNotifications.sort(
          (a, b) => a.date.getTime() - b.date.getTime(),
        );

        let notifIndex = 0;
        let splitIndex = 0;

        for (const split of invoice.paymentSplits) {
          if (split.status === "paid" && !split.paidAt && notifIndex < sortedNotification.length) {
            await crudRepo(connection, "invoice").updateOne(
              {
                _id: invoice._id,
              },
              {
                $set: {
                  [`paymentSplits.${splitIndex}.paidAt`]: sortedNotification[notifIndex].date,
                },
              },
            );
            notifIndex++;
          }
          if (split.status === "paid" && !split.paidAt && notifIndex > sortedNotification.length) {
            await crudRepo(connection, "invoice").updateOne(
              {
                _id: invoice._id,
              },
              {
                $set: {
                  [`paymentSplits.${splitIndex}.paidAt`]: invoice.updatedAt,
                },
              },
            );
            notifIndex++;
          }
          splitIndex++;
        }
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
