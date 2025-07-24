import { BadRequestError } from "../../../core/ApplicationErrors";
import { ID } from "../../../types/BaseEntity";
import { Level } from "../../levels/domains/level.entity";
import { Student } from "../../students/domain/student.entity";
import { Group } from "./group.entity";
import { GroupType } from "./groupType.entity";

export class GroupService {
  static ensureStudentsNotIncludedInGroup(studentIds: ID[], group: Group): void {
    const studentIdsInGroup = group.students;

    const isAnyStudentInGroup = studentIds.every(
      studentId => !studentIdsInGroup.includes(studentId),
    );

    if (!isAnyStudentInGroup) throw new BadRequestError("groupRules.studentAlreadyInGroup");
  }

  static ensureStudentsIncludedInGroup(studentIds: ID[], group: Group): void {
    const studentIdsInGroup = group.students;

    const isAnyStudentNotInGroup = studentIds.some(
      studentId => !studentIdsInGroup.includes(studentId),
    );
    if (isAnyStudentNotInGroup) throw new BadRequestError("groupRules.studentAlreadyInGroup");
  }

  static verifyStudentGroupLevelMatch(
    student: Pick<Student, "level">[],
    group: Pick<Group, "levels">,
  ): void {
    const studentLevelIds = student.map(student => student.level);
    const groupLevelIds = group.levels;

    const isGroupAndStudentHasDifferentLevel = studentLevelIds.some(
      studentLevelId => !groupLevelIds.find(groupLevelId => groupLevelId === studentLevelId),
    );

    if (isGroupAndStudentHasDifferentLevel) {
      throw new BadRequestError("groupRules.studentLevelNotMatch");
    }
  }

  static ensureStudentClassTypeMatchesGroupClassType(
    student: Pick<Student, "classType">[],
    group: Pick<Group, "classTypes">,
  ): void {
    const studentClassTypeIds = student.map(student => student.classType);
    const groupClassTypeIds = group.classTypes;

    const isStudentClassTypeMatchGroupClassTypes = studentClassTypeIds.some(studentClassTypeId =>
      groupClassTypeIds.includes(studentClassTypeId),
    );

    if (!isStudentClassTypeMatchGroupClassTypes) {
      throw new BadRequestError("groupRules.studentClassTypeNotMatch");
    }
  }

  static getGroupTypeCoefficient(group: Pick<Group, "groupType">): number {
    const coefficient = group.groupType.coefficient;

    if (coefficient === null || coefficient === undefined) {
      throw new BadRequestError("groupRules.groupTypeCoefficientNotFound");
    }

    return coefficient;
  }

  static ensureSingleLevelForExamsOfGroup(data: {
    newExams: { examTypeNewId: string; coefficient: number }[];
    group: { levels: Level[] };
  }): void {
    const { newExams, group } = data;

    const isIncludeInGradeBook = newExams.length > 0;

    if (isIncludeInGradeBook && group.levels.length > 1) {
      throw new BadRequestError("groupRules.groupIncludeInGradeBookCannotHaveMultipleLevels");
    }
  }
}
