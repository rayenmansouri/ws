import { BadRequestError } from "../../../core/ApplicationErrors";
import { ClassType } from "../../classTypes/repo/classType.entity";
import { GroupType } from "../../groupManagement/domains/groupType.entity";
import { Level } from "../../levels/domains/level.entity";
import { SubjectType } from "../../subjectTypes/domains/subjectType.entity";
import { SubSubjectType } from "../../subSubjectTypes/domains/subSubjectType.entity";
import { Teacher } from "./teacher.entity";

export class TeacherService {
  static checkTeacherSubjectEligibility(
    teacher: Pick<Teacher, "subjectTypes">,
    subjectType: Pick<SubjectType, "_id">,
  ): void {
    const isTeacherQualifiedToTeachSubject = teacher.subjectTypes.includes(subjectType._id);
    if (!isTeacherQualifiedToTeachSubject) {
      throw new BadRequestError("teacher.cannotTeacherThisSubjectType");
    }
  }

  static checkTeacherGroupTypeEligibility(
    teacher: Pick<Teacher, "groupTypes">,
    groupType: Pick<GroupType, "_id">,
  ): void {
    const isTeacherQualifiedToTeachGroup = teacher.groupTypes.includes(groupType._id);
    if (!isTeacherQualifiedToTeachGroup) {
      throw new BadRequestError("teacher.cannotTeacherThisGroupType");
    }
  }

  static checkTeacherSubSubjectEligibility(
    teacher: Pick<Teacher, "subjectTypes">,
    classTypes: Pick<ClassType, "subjects">,
    subSubjectType: Pick<SubSubjectType, "_id">,
  ): void {
    const subject = classTypes.subjects.find(subject =>
      subject.subSubjects.find(subSubject => subSubject.subSubjectType === subSubjectType._id),
    );

    const isTeacherQualifiedToTeachSubSubject = subject?.subjectType
      ? teacher.subjectTypes.includes(subject?.subjectType)
      : false;

    if (!isTeacherQualifiedToTeachSubSubject) {
      throw new BadRequestError("teacher.cannotTeacherThisSubSubjectType");
    }
  }

  static checkTeacherLevelEligibility(
    teacher: Pick<Teacher, "levels">,
    level: Pick<Level, "_id">,
  ): void {
    const isTeacherCanTeacherInThisLevel = teacher.levels.includes(level._id);
    if (!isTeacherCanTeacherInThisLevel) {
      throw new BadRequestError("teacher.cannotTeachInThisLevel");
    }
  }
}
