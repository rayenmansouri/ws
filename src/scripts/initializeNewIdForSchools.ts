import { MongoCounterRepo } from "./../newDatabase/mongo/repositories/MongoCounter.repo";
import { CounterSchema } from "./../core/newId/CounterModel";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { mongoSchoolModel } from "../newDatabase/mongo/schemas/school.schema";
import { container } from "./../core/container/container";

export const script = async () => {
  const allSchools = await mongoSchoolModel.find({}, {}, { sort: { createdAt: -1 } });

  const counterRepo = new MongoCounterRepo(mongoose.connection, "schools");

  for (const school of allSchools) {
    const incrementedCounter = await counterRepo.incrementAndGet();
    await mongoSchoolModel.updateMany(
      { _id: school._id },
      {
        $set: { newId: incrementedCounter.toString().padStart(5, "0") },
      },
    );
  }
};

dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    container.bind("MasterConnection").toConstantValue(mongoose.connection);

    await script();
  })
  .catch(err => {
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
