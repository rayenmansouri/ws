import { BaseRepo } from "../../../core/BaseRepo";
import { ID } from "../../../types/BaseEntity";
import { StudentProfile, StudentProfileMetaData } from "./studentProfile.entity";

export abstract class StudentProfileRepo extends BaseRepo<StudentProfileMetaData> {
  abstract getStudentProfileOfSchoolYearOrThrow(
    studentId: ID,
    schoolYearId: ID,
  ): Promise<StudentProfile>;

  abstract getStudentProfileOfSchoolYear(
    studentId: ID,
    schoolYearId: ID,
  ): Promise<StudentProfile | null>;

  abstract getManyStudentProfilesOfSchoolYear(
    studentIds: ID[],
    schoolYearId: ID,
  ): Promise<StudentProfile[]>;

  abstract getManyStudentProfilesOfSchoolYears(
    studentIds: ID[],
    schoolYearIds: ID[],
  ): Promise<StudentProfile[]>;

  abstract updateManyByStudentsAndSchoolYear(
    studentIds: ID[],
    schoolYearId: ID,
    data: Partial<StudentProfile>,
  ): Promise<void>;

  abstract countStudentsAssignedToClass(schoolYearsIds: ID[], studentsIds: ID[]): Promise<number>;

  abstract countStudentsNotAssignedToClass(
    schoolYearsIds: ID[],
    studentsIds: ID[],
  ): Promise<number>;

  abstract addGroup(studentProfilesIds: ID[], groupId: ID): Promise<void>;
  abstract removeGroup(studentProfilesIds: ID[], groupId: ID): Promise<void>;
  abstract getAllStudentProfileOfStudent(student: ID): Promise<StudentProfile[]>;
}
