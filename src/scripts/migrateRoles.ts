import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { NotFoundError } from "../core/ApplicationErrors";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { MongoAdminRepo } from "../newDatabase/mongo/repositories/MongoAdmin.repo";
import { mongoRoleSchema } from "../newDatabase/mongo/schemas/role.schema";
import { Role, SUPER_ADMIN_ROLE } from "../feature/authorization/domain/role.entity";
import { mongoSchoolModel } from "../newDatabase/mongo/schemas/school.schema";

export const migrateRoles = async () => {
  const schools = (await mongoSchoolModel.find()).filter(
    tenantDoc => tenantDoc.subdomain === "oist",
  );
  if (schools.length === 0) throw new NotFoundError("tenant not found");

  let superAdminRole: Role;
  const roleRepo = container.get("RoleRepo");
  try {
    superAdminRole = await roleRepo.findSuperAdminRoleOrThrow();
  } catch {
    superAdminRole = await roleRepo.addOne({
      name: SUPER_ADMIN_ROLE,
      permissions: [],
      userTypes: ["master", "admin", "teacher"],
      translation: {
        en: "super-admin",
        ar: "super-admin",
        fr: "super-admin",
      },
    });
  }

  await initializeSubdomains();
  for (const tenantDoc of schools) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getTenantCon(schoolSubdomain);

    console.log("🚀 Working on", connection.name);

    const roleModel = connection.model("roles", mongoRoleSchema);
    const oldRoles = await roleModel.find({});

    const adminRepo = new MongoAdminRepo(connection, null);

    const allAdmins = await adminRepo.findAll();

    for (const admin of allAdmins) {
      const adminRoles = oldRoles.filter(role => admin.roles.includes(role._id));
      const isSuperAdmin = adminRoles.some(role => role.name === SUPER_ADMIN_ROLE);

      if (isSuperAdmin) await adminRepo.updateOneById(admin._id, { roles: [superAdminRole._id] });
      else await adminRepo.updateOneById(admin._id, { roles: [] });
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
    await migrateRoles();
  })
  .catch(err => {
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
