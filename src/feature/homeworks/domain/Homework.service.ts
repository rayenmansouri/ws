import { injectable } from "inversify";
import { ID } from "../../../types/BaseEntity";
import { StudentProfile } from "../../students/domain/studentProfile.entity";

@injectable()
export class HomeworkService {
  constructor() {}

  static isAdminAllowedToViewHomework(): boolean {
    return true;
  }

  static isTeacherAllowedToViewHomework(teacherId: ID, homework: { teacher: ID | null }): boolean {
    return teacherId === homework.teacher;
  }

  static isStudentAllowedToViewHomework(
    studentProfile: StudentProfile,
    homework: { class: ID | null; group: ID | null },
  ): boolean {
    return (
      homework.class === studentProfile.class ||
      (!!homework.group && !!studentProfile.groups.includes(homework.group))
    );
  }

  static isParentAllowedToViewHomework(
    childrenProfiles: StudentProfile[],
    homework: { class: ID | null; group: ID | null },
  ): boolean {
    return childrenProfiles.some(
      studentProfile =>
        homework.class === studentProfile.class ||
        (!!homework.group && !!studentProfile.groups.includes(homework.group)),
    );
  }
}
