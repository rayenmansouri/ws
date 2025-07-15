import { Connection } from "mongoose";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { crudRepo } from "../../../database/repositories/crud.repo";
import { IStudentProfile } from "../../../database/schema/pedagogy/Profile/studentProfile.schema";
import { QueryOptions } from "../../../database/types";

export const getCurrentStudentProfileService = async (
  connection: Connection,
  studentNewId: string,
  options?: QueryOptions<IStudentProfile>,
) => {
  const studentDoc = await crudRepo(connection, "student").findOne({
    newId: studentNewId,
    isArchived: false,
  });
  if (!studentDoc) throw new NotFoundError("notFound.student");

  const level = await crudRepo(connection, "level").findOne({
    _id: studentDoc.level.toString(),
  });

  const studentProfile = await crudRepo(connection, "studentProfile").findOne(
    { student: studentDoc._id, schoolYear: level.currentSchoolYear._id },
    options,
  );

  return { studentDoc, studentProfile, currentSchoolYear: level.currentSchoolYear, level };
};
