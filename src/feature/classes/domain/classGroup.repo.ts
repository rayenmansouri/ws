import { ID } from "../../../types/BaseEntity";
import { BaseRepo } from "../../../core/BaseRepo";
import { ClassGroupMetaData } from "./classGroup.entity";

export abstract class ClassGroupRepo extends BaseRepo<ClassGroupMetaData> {
  abstract switchStudentGroup(studentId: ID, from: ID, to: ID): Promise<void>;

  abstract addStudentsToClassGroup(classGroupId: ID, studentIds: ID[]): Promise<void>;
  abstract removeStudentsFromClassGroup(classGroupId: ID, studentIds: ID[]): Promise<void>;
}
