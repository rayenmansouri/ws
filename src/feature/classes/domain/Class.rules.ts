import { BadRequestError } from "../../../core/ApplicationErrors";
import { isIncludeArrayIds } from "../../../helpers/functionsUtils";
import { ID } from "../../../types/BaseEntity";
import { Class } from "./class.entity";

export class ClassRules {
  static verifyTeacherInClass(
    teacherId: ID,
    classDoc: Pick<Class, "subjectTeacherMap" | "subSubjectTeacherMap">,
  ): void {
    const teacherTopicsIdsInClass: string[] = Object.values(classDoc.subjectTeacherMap)
      .concat(Object.values(classDoc.subSubjectTeacherMap))
      .filter(value => value != null);

    if (!isIncludeArrayIds(teacherTopicsIdsInClass, teacherId)) {
      throw new BadRequestError("classRules.teacherIsNotInClass");
    }
  }
}
