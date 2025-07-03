import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { registerAllDependencies } from "../core/container/registerAllDependencies";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();

  for (const school of schools) {
    console.log(`Updating school ${school.name} (${school.subdomain})`);
    const connection = await getNewTenantConnection(school.subdomain);
    const childContainer = container.createChild();
    childContainer.bind("Connection").toConstantValue(connection);

    const schoolYearRepo = childContainer.get("SchoolYearRepo");
    const levelRepo = childContainer.get("LevelRepo");
    const subLevelRepo = childContainer.get("SubLevelRepo");

    const allSchoolYears = await schoolYearRepo.findAll();

    for (const schoolYear of allSchoolYears) {
      const newTerms = schoolYear.terms.map(term => {
        return {
          ...term,
          startDate: schoolYear.startDate,
          endDate: schoolYear.endDate,
        };
      });

      const updatedSchoolYear = (await schoolYearRepo.updateOneById(schoolYear._id, {
        terms: newTerms,
      }))!;

      await levelRepo.updateSchoolYear(schoolYear._id, updatedSchoolYear);
      await subLevelRepo.updateSchoolYear(schoolYear._id, updatedSchoolYear);
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
