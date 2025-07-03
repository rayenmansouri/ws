import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { GradeReportTemplate } from "../feature/gradeReportTemplate/domain/gradeReportTemplate.entity";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();

  for (const school of schools) {
    console.log(`🚀 Working on ${school.name}`);
    const childContainer = container.createChild();
    const schoolConnection = await getNewTenantConnection(school.subdomain);
    childContainer.bind("Connection").toConstantValue(schoolConnection);

    const gradeReportTemplateRepo = childContainer.get("GradeReportTemplateRepo");

    const gradeReportTemplateModel =
      schoolConnection.model<GradeReportTemplate>("gradeReportTemplate");

    const builtInTemplate = await gradeReportTemplateModel.findOne({
      isBuiltIn: true,
    });

    if (!builtInTemplate)
      await gradeReportTemplateRepo.addOne({
        name: "Main",
        classTypes: [],
        subjectTypes: [],
        isBuiltIn: true,
        isDefault: true,
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
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
