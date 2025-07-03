import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { NotFoundError } from "../core/ApplicationErrors";
import { container } from "../core/container/container";
import { initializeModels, tenantSchemas } from "../core/initializeModels";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { IVerificationCode } from "../database/schema/users/verificationCode.schema";

export const fixVerificationCode = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll({});
  if (schools.length === 0) throw new NotFoundError("tenant not found");
  await initializeSubdomains();
  for (const tenantDoc of schools) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getTenantCon(schoolSubdomain);

    console.log("🚀 Working on", connection.name);

    initializeModels(connection, tenantSchemas);

    const verificationCodes: IVerificationCode[] = await connection
      .model("verificationCode")
      .find()
      .lean();

    const newVerificationCodes = verificationCodes.map(verificationCode => {
      if (verificationCode.studentId || verificationCode.userType === "student") {
        return {
          ...verificationCode,
          user: verificationCode.studentId || verificationCode.user,
          userType: "student",
          studentId: verificationCode.studentId || verificationCode.user,
        };
      }
      if (verificationCode.adminId || verificationCode.userType === "admin") {
        return {
          ...verificationCode,
          user: verificationCode.adminId || verificationCode.user,
          userType: "admin",
          adminId: verificationCode.adminId || verificationCode.user,
        };
      }
      if (verificationCode.parentId || verificationCode.userType === "parent") {
        return {
          ...verificationCode,
          user: verificationCode.parentId || verificationCode.user,
          userType: "parent",
          parentId: verificationCode.parentId || verificationCode.user,
        };
      }
      if (verificationCode.teacherId || verificationCode.userType === "teacher") {
        return {
          ...verificationCode,
          user: verificationCode.teacherId || verificationCode.user,
          userType: "teacher",
          teacherId: verificationCode.teacherId || verificationCode.user,
        };
      }
      return verificationCode;
    });

    await connection.model("verificationCode").deleteMany({});
    await connection.model("verificationCode").insertMany(newVerificationCodes);
  }
};
dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    container.bind("MasterConnection").toConstantValue(mongoose.connection);
    await fixVerificationCode();
  })
  .catch(err => {
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
