import { MongoCounterRepo } from "../newDatabase/mongo/repositories/MongoCounter.repo";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { mongoSchoolModel } from "../newDatabase/mongo/schemas/school.schema";
import { container } from "../core/container/container";
import {
  EDUCATION_DEPARTMENT_ENUM,
  GRADE_REPORT_THEM_ENUM,
  INSTANCE_TYPE_ENUM,
} from "../feature/schools/domain/school.entity";
import { FEATURE_FLAGS_ENUM } from "../feature/schools/constants/featureFlags";

export const script = async () => {
  const allSchools = await mongoSchoolModel.find({}, {}, { sort: { createdAt: -1 } });

  const counterRepo = new MongoCounterRepo(mongoose.connection, "schools");
  const incrementedCounter = await counterRepo.incrementAndGet();

  const isCambridgeExist = allSchools.find(school => school.subdomain === "oist");
  if (isCambridgeExist) return;
  await mongoSchoolModel.insertMany([
    {
      newId: incrementedCounter.toString().padStart(5, "0"),
      name: "Cambridge International School of Tunis",
      subdomain: "oist",
      timeZone: "Africa/Tunis",
      address: "Les Berges du lac 3",
      dueDate: 5,
      taxRate: 7,
      phoneNumber: "55102102",
      email: "contact@oist.tn",
      directorName: "Kamel Jemaa",
      currency: "TND",
      logo: "https://www.dropbox.com/scl/fi/52ge8gc8x3jam8uj3m4wi/oist_1729069439012906.5290257534508.jpg?rlkey=bw6k1vg4jbry4gxmd8qyz1g32&dl=0&raw=1",
      forceCloseSessionDelayInMin: 15,
      openSessionDelayInMin: 30,
      openSessionAdvanceInMin: 15,
      maxStudentSeats: 1000,
      enableEmail: true,
      enableSms: true,
      cover:
        "https://www.dropbox.com/scl/fi/g5546zpfg8henqyubvknc/school_cover.jpg?rlkey=dshwm08ga8uyjhwr1p8c41x8u&st=53g103mq&dl=0&raw=1",
      schedule: { startHour: 8, endHour: 18, days: [1, 2, 3, 4, 5, 6] },
      financeSignature: null,
      gradeBookTheme: GRADE_REPORT_THEM_ENUM.BLUE,
      educationDepartment: EDUCATION_DEPARTMENT_ENUM.TUNIS,
      instanceType: INSTANCE_TYPE_ENUM.CAMBRIDGE,
      featureFlags: {
        [FEATURE_FLAGS_ENUM.ANNOUNCEMENTS]: true,
        [FEATURE_FLAGS_ENUM.MESSAGES]: true,
        [FEATURE_FLAGS_ENUM.LMS]: false,
      },
    },
  ]);
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
