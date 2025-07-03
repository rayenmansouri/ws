import dotenv from "dotenv";
import { Session } from "inspector/promises";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { Post } from "../feature/announcements/domain/post.entity";
import { ClassType } from "../feature/classTypes/repo/classType.entity";
import { Group } from "../feature/groupManagement/domains/group.entity";
import { GroupType } from "../feature/groupManagement/domains/groupType.entity";
import { Homework } from "../feature/homeworks/domain/homework.entity";
import { Observation } from "../feature/observations/domain/observation.entity";
import { StudentProfile } from "../feature/students/domain/studentProfile.entity";
import { SubLevel } from "../feature/subLevels/domains/subLevel.entity";
import { Teacher } from "../feature/teachers/domain/teacher.entity";
import { WeeklySession } from "../feature/weeklySessions/domains/weeklySession.entity";
import { isIdsEqual } from "../helpers/functionsUtils";
import { BaseEntity, ID } from "../types/BaseEntity";
import { ICounterSchema } from "../core/newId/CounterModel";
import { registerAllDependencies } from "../core/container/registerAllDependencies";

type OptionalSubjectType = {
  name: string;
  exams: { examType: ID; coefficient: number }[];
} & BaseEntity;

type OptionalSubject = {
  name: string;
  optionalSubjectType: OptionalSubjectType;
  teacher: ID;
  students: ID[];
  schoolYear: ID;
  subLevel: ID;
} & BaseEntity;

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();

  for (const school of schools) {
    console.log(`🚀 Working on ${school.name}`);
    const childContainer = container.createChild();
    const schoolConnection = await getNewTenantConnection(school.subdomain);
    childContainer.bind("Connection").toConstantValue(schoolConnection);

    const optionalSubjectTypeModel = schoolConnection.model<Omit<GroupType, "coefficient">>(
      "optionalSubjectType",
      new mongoose.Schema({}, { strict: false }),
    );
    const groupTypeModel = schoolConnection.model<GroupType>("groupType");

    const optionalSubjectModel = schoolConnection.model<OptionalSubject>(
      "optionalSubject",
      new mongoose.Schema({}, { strict: false }),
    );

    const groupModel = schoolConnection.model<Group>("group");

    const subLevelModel = schoolConnection.model<SubLevel>("subLevel");

    const classTypeModel = schoolConnection.model<ClassType>("classType");

    const optionalSubjectTypes = await optionalSubjectTypeModel.find({}).lean();

    const newGroupTypesPayload = optionalSubjectTypes.map<GroupType>(groupType => ({
      ...groupType,
      coefficient: 1,
    }));

    await groupTypeModel.insertMany(newGroupTypesPayload);

    const classTypes = await classTypeModel.find({}).lean();

    const optionalSubjects = await optionalSubjectModel.find({}).lean();

    const subLevelIds = optionalSubjects.map(optionalSubject => optionalSubject.subLevel);

    const subLevels = await subLevelModel.find({ _id: { $in: subLevelIds } }).lean();

    const newGroupPayload = optionalSubjects.map<Group>(optionalSubject => {
      const subLevel = subLevels.find(subLevel =>
        isIdsEqual(subLevel._id, optionalSubject.subLevel),
      )!;

      const classTypeIds = classTypes
        .filter(classType => isIdsEqual(classType.subLevel, subLevel._id))
        .map(classType => classType._id);

      const levelId = subLevel.level._id;

      return {
        _id: optionalSubject._id,
        newId: optionalSubject.newId,
        name: optionalSubject.name,
        teacher: optionalSubject.teacher,
        students: optionalSubject.students,
        groupType: {
          ...optionalSubject.optionalSubjectType,
          coefficient: 1,
          illustration: "DEFAULT",
        },
        schoolYears: [optionalSubject.schoolYear],
        levels: [levelId],
        classTypes: classTypeIds,
        createdAt: optionalSubject.createdAt,
        updatedAt: optionalSubject.updatedAt,
      };
    });

    await groupModel.deleteMany({ class: { $exists: true } });
    await groupModel.insertMany(newGroupPayload);
    await updateFieldNamesInModels(schoolConnection);

    const counterModel = schoolConnection.model<ICounterSchema>("counter");

    const groupTypesDocumentsNumbers = await groupTypeModel.countDocuments();
    const groupDocumentsNumbers = await groupModel.countDocuments();

    const groupTypesCounter = await counterModel.findOne({ collectionName: "grouptypes" }).lean();
    const groupCounter = await counterModel.findOne({ collectionName: "groups" }).lean();
    const currentGroupTypesCounter = groupTypesCounter?.count ?? 0;
    const currentGroupCounter = groupCounter?.count ?? 0;

    const newGroupTypeCounter = Math.max(currentGroupTypesCounter, groupTypesDocumentsNumbers);
    const newGroupCounter = Math.max(currentGroupCounter, groupDocumentsNumbers);

    await counterModel.updateOne(
      { collectionName: "grouptypes" },
      { $set: { count: newGroupTypeCounter } },
      { upsert: true },
    );

    await counterModel.updateOne(
      { collectionName: "groups" },
      { $set: { count: newGroupCounter } },
      { upsert: true },
    );
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
