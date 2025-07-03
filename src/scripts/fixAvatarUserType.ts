import dotenv from "dotenv";
import mongoose, { Connection } from "mongoose";
import { masterDBUri } from "../config";
import { END_USER_ENUM, TEndUserEnum } from "../constants/globalEnums";
import { container } from "../core/container/container";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { mongoMasterModel } from "../newDatabase/mongo/schemas/master.schema";
import { registerAllDependencies } from "../core/container/registerAllDependencies";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");

  await mongoMasterModel.updateMany({ avatar: { $exists: true, $ne: null, $type: "string" } }, [
    {
      $set: {
        avatar: {
          name: "$avatar",
          link: "$avatar",
          path: "$avatar",
          uploadedAt: new Date(),
          size: 660,
          mimeType: "png",
        },
      },
    },
  ]);
  const schools = await schoolRepo.findAll();
  const tenantsDocs = schools;
  await initializeSubdomains();

  for (const tenantDoc of tenantsDocs) {
    const school = schoolDocStore[tenantDoc._id.toString()];
    const schoolSubdomain = school.subdomain;
    console.log("WORKING ON", schoolSubdomain);
    const connection = await getNewTenantConnection(schoolSubdomain);

    await updateAvatarField(connection, END_USER_ENUM.ADMIN);
    await updateAvatarField(connection, END_USER_ENUM.TEACHER);
    await updateAvatarField(connection, END_USER_ENUM.PARENT);
    await updateAvatarField(connection, END_USER_ENUM.STUDENT);
  }
};
const updateAvatarField = async (connection: Connection, endUser: TEndUserEnum) => {
  const result = await connection
    .model(endUser)
    .updateMany({ avatar: { $exists: true, $ne: null, $type: "string" } }, [
      {
        $set: {
          avatar: {
            name: "$avatar",
            link: "$avatar",
            path: "$avatar",
            uploadedAt: new Date(),
            size: 660,
            mimeType: "png",
          },
        },
      },
    ]);
  console.log("🚀 ~ updateAvatarField ~ result:", result);
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

type collectionName = string;
type modelName = string;
