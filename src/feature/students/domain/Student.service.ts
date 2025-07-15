import _, { uniqBy } from "lodash";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { Parent } from "../../parents/domain/parent.entity";
import { ID } from "./../../../types/BaseEntity";
import { Student } from "./student.entity";

export class StudentService {
  static ensureStudentIsNotAssignedToParent(student: Student, parent: Parent): void {
    if (parent.students.includes(student._id))
      throw new BadRequestError("studentRules.studentAlreadyAssignedToParent");
  }

  static ensureStudentIsAssignedToParent(studentId: ID, parent: Parent): void {
    if (!parent.students.includes(studentId))
      throw new BadRequestError("studentRules.studentNotAssignedToParent");
  }

  static ensureParentIsNotAssignedToStudent(parent: Parent, student: Student): void {
    if (student.parents.includes(parent._id))
      throw new BadRequestError("studentRules.parentAlreadyAssignedToStudent");
  }

  static ensureParentIsAssignedToStudent(parent: Parent, student: Student): void {
    if (!student.parents.includes(parent._id))
      throw new BadRequestError("studentRules.parentNotAssignedToStudent");
  }

  static ensureStudentNotArchived(student: Student): void {
    if (student.isArchived) throw new BadRequestError("studentRules.studentArchived");
  }
  static getCommonParents(students: { parents: Parent[] }[]): Parent[] {
    const parentsOfEachStudent = students.map(student => student.parents);

    const commonParents = _.reduce(parentsOfEachStudent, (acc, arr) =>
      _.intersectionBy(acc, arr, "_id"),
    );

    if (!commonParents) return [];

    const uniqueParents = uniqBy(commonParents, parent => parent._id);
    return uniqueParents;
  }

  static ensureParentPermission(students: { parents: Parent[] }[], parentId?: ID): void {
    if (!parentId) return;
    const parentIds = students.flatMap(student => student.parents.map(parent => parent._id));
    if (!parentIds.includes(parentId)) throw new BadRequestError("global.accessDenied");
  }
}
