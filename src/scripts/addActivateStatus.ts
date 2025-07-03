import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { registerAllDependencies } from "../core/container/registerAllDependencies";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();

  for (const school of schools) {
    const childContainer = container.createChild();
    const schoolConnection = await getTenantCon(school.subdomain);
    console.log("Working on", schoolConnection.name);
    childContainer.bind("Connection").toConstantValue(schoolConnection);

    const studentRepo = childContainer.get("StudentRepo");
    const adminRepo = childContainer.get("AdminRepo");
    const parentRepo = childContainer.get("ParentRepo");
    const teacherRepo = childContainer.get("TeacherRepo");

    const students = await studentRepo.findAll();
    const admins = await adminRepo.findAll();
    const parents = await parentRepo.findAll();
    const teachers = await teacherRepo.findAll();
    const studentIds = students.map(student => student._id);
    const adminIds = admins.map(admin => admin._id);
    const parentIds = parents.map(parent => parent._id);
    const teacherIds = teachers.map(teacher => teacher._id);

    await studentRepo.updateManyByIds(studentIds, { isActive: true });
    await adminRepo.updateManyByIds(adminIds, { isActive: true });
    await parentRepo.updateManyByIds(parentIds, { isActive: true });
    await teacherRepo.updateManyByIds(teacherIds, { isActive: true });
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
