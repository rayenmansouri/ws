import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { ESTABLISHMENT_TITLE_ENUM } from "../feature/levels/domains/level.entity";
import { registerAllDependencies } from "../core/container/registerAllDependencies";

const ESTABLISHMENT_MAP = {
  ["المدرسة البتدائية الخاصة"]: ESTABLISHMENT_TITLE_ENUM.PRIVATE_PRIMARY,
  ["المدرسة الابتدائية الخاصّة المجد"]: ESTABLISHMENT_TITLE_ENUM.PRIVATE_PRIMARY,
  ["المدرسة الإعدادية الخاصة"]: ESTABLISHMENT_TITLE_ENUM.PRIVATE_MIDDLE,
  ["المدرسة الإبتدائية الخاصة"]: ESTABLISHMENT_TITLE_ENUM.PRIVATE_PRIMARY,
};

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();

  for (const school of schools) {
    const childContainer = container.createChild();
    const schoolConnection = await getTenantCon(school.subdomain);
    childContainer.bind("Connection").toConstantValue(schoolConnection);
    const levelRepo = childContainer.get("LevelRepo");
    const levels = await levelRepo.findAll();

    for (const level of levels) {
      const establishmentTitle =
        ESTABLISHMENT_MAP[level.establishmentTitle as keyof typeof ESTABLISHMENT_MAP];
      if (establishmentTitle) {
        await levelRepo.updateOneById(level._id, { establishmentTitle });
      } else {
        console.log(`${level.name} not found in school ${school.subdomain}`);
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
