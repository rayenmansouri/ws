import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { GradeBookObservation } from "../feature/gradeBookObservation/gradeBookObservation.entity";
import { BaseEntity } from "../types/BaseEntity";
import { registerAllDependencies } from "../core/container/registerAllDependencies";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();

  for (const school of schools) {
    console.log(`🚀 Working on ${school.name}`);
    const childContainer = container.createChild();
    const schoolConnection = await getNewTenantConnection(school.subdomain);
    childContainer.bind("Connection").toConstantValue(schoolConnection);

    const classRepo = childContainer.get("ClassRepo");
    const allClasses = await classRepo.findAll({ populate: ["schoolYear"] });

    const payloads: Omit<GradeBookObservation, keyof BaseEntity>[] = [];

    for (const classDoc of allClasses) {
      for (const terms of classDoc.schoolYear.terms) {
        payloads.push({
          topicId: null,
          topicType: null,
          class: classDoc._id,
          term: terms._id,
          observations: {},
          ibInvestments: {},
        });
      }
    }

    const gradeBookObservationRepo = childContainer.get("GradeBookObservationRepo");
    await gradeBookObservationRepo.addMany(payloads);
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
    await scripts();
  })
  .catch(err => {
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
