import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { initializeModels, tenantSchemas } from "../core/initializeModels";
import { NotFoundError } from "../core/ApplicationErrors";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { crudRepo } from "../database/repositories/crud.repo";
import { IClassType } from "../database/schema/pedagogy/class/classType.schema";

export const script = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const tenantsDocs = (await schoolRepo.findAll()).filter(
    tenantDoc => tenantDoc.subdomain === "oist",
  );

  if (tenantsDocs.length === 0) throw new NotFoundError("tenant not found");
  await initializeSubdomains();
  for (const tenantDoc of tenantsDocs) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getTenantCon(schoolSubdomain);
    initializeModels(connection, tenantSchemas);

    console.log("🚀 ~ Working on", connection.name);

    const classTypes = await crudRepo(connection, "classType").findMany({});

    const updateClassTypePromise: Promise<IClassType>[] = [];

    for (const classType of classTypes) {
      const updatedClassType: IClassType = classType;

      classType.subjects.forEach((subject, i) => {
        if (
          subject.subSubjects.length === 0 &&
          "isIncludedInGradeBook" in subject &&
          subject.isIncludedInGradeBook === false
        ) {
          updatedClassType.subjects[i].exams = [];
          console.log(
            "🚀 ~ classType.subjects.forEach ~ updatedClassType.subjects[i]:",
            updatedClassType.subjects[i],
          );
        } else if (subject.subSubjects.length > 0) {
          subject.subSubjects.forEach((subSubject, j) => {
            if (
              "isIncludedInGradeBook" in subSubject &&
              subSubject.isIncludedInGradeBook === false
            ) {
              console.log(
                "🚀 ~ subject.subSubjects.forEach ~  updatedClassType.subjects[i].subSubjects[j]:",
                updatedClassType.subjects[i].subSubjects[j],
              );
              updatedClassType.subjects[i].subSubjects[j].exams = [];
            }
          });
        }
      });
      updateClassTypePromise.push(
        crudRepo(connection, "classType").updateOne({ _id: classType._id }, updatedClassType),
      );
    }

    await Promise.all(updateClassTypePromise);

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
