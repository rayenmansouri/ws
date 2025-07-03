import { School } from "./../feature/schools/domain/school.entity";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();

  const promises: Promise<School | null>[] = [];

  schools.forEach(school => {
    //@ts-ignore
    const currentSchoolCover: string = school.cover?.URL;

    if (currentSchoolCover === undefined) return;

    promises.push(
      schoolRepo.updateOneById(school._id, {
        cover: currentSchoolCover,
      }),
    );
  });

  await Promise.all(promises);
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

type collectionName = string;
type modelName = string;
