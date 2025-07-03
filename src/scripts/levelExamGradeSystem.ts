import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { EXAM_GRADE_SYSTEM_ENUM } from "../feature/levels/domains/level.entity";

const LEVEL_MAP = {
  Secondaire: EXAM_GRADE_SYSTEM_ENUM.SECONDARY,
  Collège: EXAM_GRADE_SYSTEM_ENUM.SECONDARY,
  ابتدائي: EXAM_GRADE_SYSTEM_ENUM.PRIMARY,
  Lycée: EXAM_GRADE_SYSTEM_ENUM.SECONDARY,
  إعدادي: EXAM_GRADE_SYSTEM_ENUM.SECONDARY,
  ثانوي: EXAM_GRADE_SYSTEM_ENUM.SECONDARY,
  collège: EXAM_GRADE_SYSTEM_ENUM.SECONDARY,
  PEI: EXAM_GRADE_SYSTEM_ENUM.SECONDARY,
  تحضيري: EXAM_GRADE_SYSTEM_ENUM.SECONDARY,
  تمهيدي: EXAM_GRADE_SYSTEM_ENUM.SECONDARY,
  RobotLab: EXAM_GRADE_SYSTEM_ENUM.SECONDARY,
  Formation: EXAM_GRADE_SYSTEM_ENUM.SECONDARY,
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
      const examGradeSystem = LEVEL_MAP[level.name as keyof typeof LEVEL_MAP];
      if (examGradeSystem) {
        await levelRepo.updateOneById(level._id, { examGradeSystem });
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
