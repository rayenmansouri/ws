import { Connection } from "mongoose";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { crudRepo } from "../../../../database/repositories/crud.repo";
import { ITeacherProfile } from "../../../../database/schema/pedagogy/Profile/teacherProfile.schema";
import { IClass } from "../../../../database/schema/pedagogy/class/class.schema";
import { populateInterface } from "../../../../database/types";
import { TOPIC_TYPE_ENUM, TTopicTypeEnum } from "../../../../helpers/constants";
import { Group } from "../../../../feature/groupManagement/domains/group.entity";
import { isIdsEqual } from "../../../../helpers/functionsUtils";
import { PickFromEnum } from "../../../../types/utils/enums.util";
import { GetSubjectsOfClassByAdminTranslationKeysEnum } from "../../constants/admin/getTeacherSubjectsOfClassByAdmin.constants";
import { TGetTeacherSubjectsOfClassByAdminResponse } from "../../types/admin/getTeacherSubjectsOfClassByAdmin.types";

export const getTeacherSubjectsOfClassService = async (
  connection: Connection,
  teacherNewId: string,
  classNewId: string,
  isGroup: boolean | undefined,
): Promise<TGetTeacherSubjectsOfClassByAdminResponse> => {
  const teacherPromise = crudRepo(connection, "teacher").findOne({
    newId: teacherNewId,
    isArchived: false,
  });

  if (isGroup === true) {
    const group = (await crudRepo(connection, "group").findOne({
      newId: classNewId,
    })) as Group | null;

    if (!group) throw new NotFoundError("notFound.group");

    return {
      classId: String(group._id),
      classNewId: group.newId,
      className: group.name,
      terms: [
        {
          _id: String(group._id),
          newId: group.newId,
          name: group.groupType.name,
          type: TOPIC_TYPE_ENUM.GROUP,
        },
      ],
    };
  }

  const classPromise = crudRepo(connection, "class").findOne({ newId: classNewId });

  const [teacher, classDoc] = await Promise.all([teacherPromise, classPromise]);

  if (!classDoc)
    throw new NotFoundError(GetSubjectsOfClassByAdminTranslationKeysEnum.CLASS_NOT_FOUND);
  if (!teacher)
    throw new NotFoundError(GetSubjectsOfClassByAdminTranslationKeysEnum.TEACHER_NOT_FOUND);

  const teacherProfile = (await crudRepo(connection, "teacherProfile").findMany(
    { teacher: teacher, schoolYear: classDoc.schoolYear },
    { populate: ["classes"] },
  )) as unknown as populateInterface<ITeacherProfile, { classes: IClass[] }>[];

  const classesOfTeacher = teacherProfile.flatMap(teacherProfile => teacherProfile.classes);

  const classObj = classesOfTeacher.find(classDoc => classDoc.newId === classNewId);
  if (!classObj)
    throw new BadRequestError(
      GetSubjectsOfClassByAdminTranslationKeysEnum.TEACHER_NOT_INCLUDED_IN_CLASS,
    );

  const subjects: {
    _id: string;
    newId: string;
    name: string;
    type: PickFromEnum<TTopicTypeEnum, "subSubjectType" | "subjectType">;
  }[] = [];
  const teacherSubjectsTypes: string[] = [];
  const teacherSubSubject: string[] = [];
  if (classObj.subjectTeacherMap)
    for (const [subjectTypeId, teacherId] of Object.entries(classObj.subjectTeacherMap)) {
      if (isIdsEqual(teacherId, teacher._id)) {
        teacherSubjectsTypes.push(subjectTypeId);
      }
    }
  if (classObj.subSubjectTeacherMap)
    for (const [subSubjectTypeId, teacherId] of Object.entries(classObj.subSubjectTeacherMap)) {
      if (isIdsEqual(teacherId, teacher._id)) {
        teacherSubSubject.push(subSubjectTypeId);
      }
    }
  const subjectsTypePromise = crudRepo(connection, "subjectType").findMany({
    _id: { $in: teacherSubjectsTypes },
  });
  const subSubjectsTypePromise = crudRepo(connection, "subSubjectType").findMany({
    _id: { $in: teacherSubSubject },
  });
  const [subjectTypeDocs, subSubjectTypesDocs] = await Promise.all([
    subjectsTypePromise,
    subSubjectsTypePromise,
  ]);

  for (const subjectTypeDoc of subjectTypeDocs) {
    subjects.push({
      _id: String(subjectTypeDoc._id),
      newId: subjectTypeDoc.newId,
      name: subjectTypeDoc.name,
      type: TOPIC_TYPE_ENUM.SUBJECT_TYPE,
    });
  }
  for (const subSubjectTypeDoc of subSubjectTypesDocs) {
    subjects.push({
      _id: String(subSubjectTypeDoc._id),
      newId: subSubjectTypeDoc.newId,
      name: subSubjectTypeDoc.name,
      type: TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE,
    });
  }

  return {
    classId: String(classObj._id),
    classNewId: classObj.newId,
    className: classObj.name,
    terms: subjects,
  };
};
