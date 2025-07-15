import { Connection } from "mongoose";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { crudRepo } from "../../../database/repositories/crud.repo";
import { IClassType } from "../../../database/schema/pedagogy/class/classType.schema";
import { IParent } from "../../../database/schema/users/parent.schema";
import { IStudent } from "../../../database/schema/users/student.schema";
import { populateInterface } from "../../../database/types";
import { IClass } from "../../../database/schema/pedagogy/class/class.schema";
import { IStudentProfile } from "../../../database/schema/pedagogy/Profile/studentProfile.schema";
import { ILevel } from "../../../database/schema/pedagogy/structure/level.schema";

export const getCurrentClassOfStudentService = async (
  connection: Connection,
  studentNewId: string,
): Promise<{
  studentDoc: populateInterface<IStudent, { parents: IParent[]; classType: IClassType }>;
  isEnrolled: boolean;
  studentClass: IClass;
  studentProfile: IStudentProfile;
  level: ILevel;
}> => {
  const studentDoc = (await crudRepo(connection, "student").findOne(
    { newId: studentNewId, isArchived: false },
    { populate: ["parents", "classType"] },
  )) as unknown as populateInterface<IStudent, { parents: IParent[]; classType: IClassType }>;
  if (!studentDoc) throw new NotFoundError("notFound.student");

  const level = await crudRepo(connection, "level").findOne({ _id: studentDoc.level });

  const studentProfile = await crudRepo(connection, "studentProfile").findOne({
    student: studentDoc._id,
    schoolYear: level.currentSchoolYear._id,
  });

  let isEnrolled = true;

  const studentClass = await crudRepo(connection, "class").findOne({
    _id: studentProfile?.class,
  });

  if (!studentClass) {
    isEnrolled = false;
  }

  return { studentDoc, isEnrolled, studentClass, studentProfile, level };
};
