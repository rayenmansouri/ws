import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { NotFoundError } from "../core/ApplicationErrors";
import { container } from "../core/container/container";
import { initializeModels, tenantSchemas } from "../core/initializeModels";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { populateInterface } from "../database/types";
import { IClassType } from "../database/schema/pedagogy/class/classType.schema";
import { ISubLevel } from "../database/schema/pedagogy/structure/subLevel.schema";
import { EntityMapper } from "../feature/entity/mapper/entity.mapper";
import { getScriptArgs } from "../helpers/getScriptArgs";
import { ID } from "../types/BaseEntity";

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

    const classTypes = (await connection
      .model("classType")
      .find()
      .populate("subLevel")
      //@ts-ignore
      .lean()) as unknown as populateInterface<IClassType, { subLevel: ISubLevel | null }>[];

    const classTypesToBeDeleted = classTypes.filter(classType => !classType.subLevel);

    classTypesToBeDeleted.forEach(classType => {
      console.log(
        "🚀 ClassType to be deleted",
        EntityMapper.toEntityDto({ ...classType, _id: String(classType._id) as ID }),
      );
    });

    const classTypesToBeDeletedIds = classTypesToBeDeleted.map(classType => classType._id);

    const canDeleteClassType = getScriptArgs()[0] === "enableDelete";

    if (canDeleteClassType) {
      await connection.model("classType").deleteMany({ _id: { $in: classTypesToBeDeletedIds } });
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
