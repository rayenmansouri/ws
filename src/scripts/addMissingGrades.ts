import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { registerAllDependencies } from "../core/container/registerAllDependencies";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { DISPENSED_STATUS } from "../feature/examGrade/domain/tunisian/ExamGrade.entity";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();
  for (const school of schools) {
    const childContainer = container.createChild();
    const schoolConnection = await getNewTenantConnection(school.subdomain);
    console.log("Working on", school.name);
    childContainer.bind("Connection").toConstantValue(schoolConnection);

    const classRepo = childContainer.get("ClassRepo");
    const examGradeRepo = childContainer.get("ExamGradeRepo");

    const classes = await classRepo.findAll();

    for (const classDoc of classes) {
      const examGradesOfClass = await examGradeRepo.getExamGradesOfClass(classDoc._id);

      for (const examGrade of examGradesOfClass) {
        for (const studentId of classDoc.students) {
          if (!Object.keys(examGrade.degrees).includes(studentId))
            await schoolConnection
              .model("examGrade")
              .updateOne(
                { _id: examGrade._id },
                { $set: { [`degrees.${studentId}`]: DISPENSED_STATUS } },
              );
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
