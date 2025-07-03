import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";

const TERM_COEFFICIENT_MAP = {
  "Term 1": 1,
  "Term 2": 2,
  "Term 3": 2,
  "الثلاثّي الأوّل": 1,
  "الثلاثّي الثاني": 2,
  "الثلاثّي الثالث": 2,
  "trimestre 1": 1,
  "trimestre 2": 2,
  "trimestre 3": 2,
  "1er semestre": 1,
  "2ème semestre": 1,
};

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();

  for (const school of schools) {
    const childContainer = container.createChild();
    const schoolConnection = await getTenantCon(school.subdomain);
    childContainer.bind("Connection").toConstantValue(schoolConnection);
    const termRepo = childContainer.get("TermRepo");
    const terms = await termRepo.findAll();

    for (const term of terms) {
      const coefficient = TERM_COEFFICIENT_MAP[term.name as keyof typeof TERM_COEFFICIENT_MAP];
      if (coefficient) {
        await termRepo.updateOneById(term._id, { coefficient });
      } else {
        console.log(`Term ${term.name} not found in school ${school.subdomain}`);
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
