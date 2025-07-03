import dotenv from "dotenv";
import { Session } from "inspector/promises";
import mongoose, { ObjectId } from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { ICounterSchema } from "../core/newId/CounterModel";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { Post } from "../feature/announcements/domain/post.entity";
import { Homework } from "../feature/homeworks/domain/homework.entity";
import { Observation } from "../feature/observations/domain/observation.entity";
import { IFile } from "../feature/sessionManagement/domain/session.entity";
import { StudentProfile } from "../feature/students/domain/studentProfile.entity";
import { Teacher } from "../feature/teachers/domain/teacher.entity";
import { WeeklySession } from "../feature/weeklySessions/domains/weeklySession.entity";
import { BaseEntity, ID } from "../types/BaseEntity";
import { registerAllDependencies } from "../core/container/registerAllDependencies";

export const PUNISHMENT_URGENCY_ENUM = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;
export type TPunishmentUrgencyEnum =
  (typeof PUNISHMENT_URGENCY_ENUM)[keyof typeof PUNISHMENT_URGENCY_ENUM];

type PunishmentReason = {
  name: string;
  urgency: TPunishmentUrgencyEnum;
} & BaseEntity;

type Punishment = {
  punishmentReason: PunishmentReason;
  issuerTeacher: ObjectId | undefined;
  issuerAdmin: ObjectId | undefined;
  issueDate: Date;
  dueDate: Date;
  status: string;
  note: string;
  student: ObjectId;
  class: ObjectId | undefined;
  group: ObjectId | undefined;
  files: IFile[];
  session?: ObjectId;
} & BaseEntity;

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();
  for (const school of schools) {
    console.log(`🚀 Working on ${school.name}`);
    const childContainer = container.createChild();
    const schoolConnection = await getNewTenantConnection(school.subdomain);

    childContainer.bind("Connection").toConstantValue(schoolConnection);

    const punishmentReasonModel = schoolConnection.model<PunishmentReason>(
      "punishmentReason",
      new mongoose.Schema({}, { strict: false }),
    );

    const counterModel = schoolConnection.model<ICounterSchema>("counter");

    const isObservationReasonCounterExist = await counterModel
      .findOne({ collectionName: "observationreasons" })
      .lean();

    const punishmentReasonCounter = await counterModel
      .findOne({ collectionName: "punishmentreasons" })
      .lean();

    if (isObservationReasonCounterExist) {
      await counterModel.updateOne(
        { _id: isObservationReasonCounterExist._id },
        { count: punishmentReasonCounter != null ? punishmentReasonCounter.count + 1 : 0 },
      );
    } else {
      await counterModel.updateOne(
        { collectionName: "punishmentreasons" },
        { collectionName: "observationreasons" },
      );
    }
    const isObservationCounterExist = await counterModel
      .findOne({ collectionName: "observations" })
      .lean();

    const punishmentCounter = await counterModel.findOne({ collectionName: "punishments" }).lean();

    if (isObservationCounterExist) {
      await counterModel.updateOne(
        { _id: isObservationCounterExist._id },
        { count: punishmentCounter != null ? punishmentCounter.count + 1 : 0 },
      );
    } else {
      await counterModel.updateOne(
        { collectionName: "punishments" },
        { collectionName: "observations" },
      );
    }

    const punishmentModel = schoolConnection.model<Punishment>(
      "punishment",
      new mongoose.Schema({}, { strict: false }),
    );

    const punishments = await punishmentModel.find({}).lean();

    const observationReasons = await punishmentReasonModel.find({}).lean();

    const observationReasonRepo = childContainer.get("ObservationReasonRepo");

    await observationReasonRepo.addMany(observationReasons);

    const newObservationData: Omit<Observation, keyof BaseEntity>[] = punishments.map(
      punishment => {
        const files: Observation["files"] = punishment.files.map(file => ({
          ...file,
          link: file.url,
          path: file.public_id,
          uploadedAt: file.date,
        }));
        const data: Omit<Observation, keyof BaseEntity> = {
          observationReason: punishment.punishmentReason,
          issuerType: punishment.issuerTeacher ? "teacher" : "admin",
          issuer: String(punishment.issuerTeacher || punishment.issuerAdmin) as ID,
          note: punishment.note,
          students: [String(punishment.student) as ID],
          class: punishment.class ? (String(punishment.class) as ID) : null,
          group: punishment.group ? (String(punishment.group) as ID) : null,
          files,
          session: punishment.session ? (String(punishment.session) as ID) : null,
        };

        return data;
      },
    );

    const observationRepo = childContainer.get("ObservationRepo");

    await observationRepo.addMany(newObservationData);

    await updateFieldNamesInModels(schoolConnection);
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

async function updateFieldNamesInModels(schoolConnection: mongoose.Connection): Promise<void> {
  const PunishmentModel = schoolConnection.model<Observation>("punishment");
  const SessionModel = schoolConnection.model<Session>("session");
  const TeacherProfileModel = schoolConnection.model("teacherProfile");
  const PostModel = schoolConnection.model<Post>("post");
  const homeworkModel = schoolConnection.model<Homework>("homework");
  const StudentProfileModel = schoolConnection.model<StudentProfile>("studentProfile");
  const WeeklySessionModel = schoolConnection.model<WeeklySession>("weeklySession");
  const TeacherModel = schoolConnection.model<Teacher>("teacher");

  const optionalSubjectQuery = { optionalSubject: { $exists: true } };
  const optionalSubjectsQuery = { optionalSubjects: { $exists: true } };

  await TeacherModel.updateMany(
    { optionalSubjectTypes: { $exists: true } },
    { $rename: { optionalSubjectTypes: "groupTypes" } },
    { strict: false },
  );

  //?remove the field group from all document that have moved to field classGroup
  await WeeklySessionModel.updateMany(
    { classGroup: { $exists: true } },
    { $unset: { group: "" } },
    { strict: false },
  );

  await WeeklySessionModel.updateMany(
    optionalSubjectQuery,
    { $rename: { optionalSubject: "group" } },
    { strict: false },
  );

  await StudentProfileModel.updateMany(
    { ...optionalSubjectQuery, optionalSubject: { $ne: null } },
    [{ $set: { groups: ["$optionalSubject"] } }, { $unset: "optionalSubject" }],
    { strict: false },
  );

  //Add default groups array to those who have optionalSubject field
  await StudentProfileModel.updateMany(
    { groups: { $exists: false } },
    { $set: { groups: [] } },
    { strict: false },
  );

  await homeworkModel.updateMany(
    optionalSubjectQuery,
    { $rename: { optionalSubject: "group" } },
    { strict: false },
  );

  await PunishmentModel.updateMany(
    optionalSubjectQuery,
    { $rename: { optionalSubject: "group" } },
    { strict: false },
  );

  //?remove the field group from all document that have moved to field classGroup
  await SessionModel.updateMany(
    { classGroup: { $exists: true } },
    { $unset: { group: "" } },
    { strict: false },
  );

  await SessionModel.updateMany(
    optionalSubjectQuery,
    { $rename: { optionalSubject: "group" } },
    { strict: false },
  );

  await TeacherProfileModel.updateMany(
    optionalSubjectsQuery,
    { $rename: { optionalSubjects: "groups" } },
    { strict: false },
  );

  await PostModel.updateMany(
    optionalSubjectsQuery,
    { $rename: { optionalSubjects: "groups" } },
    { strict: false },
  );
}
