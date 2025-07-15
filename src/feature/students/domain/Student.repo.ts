import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { Student, StudentMetaData } from "./student.entity";

export abstract class StudentRepo extends BaseRepo<StudentMetaData> {
  abstract addParentsToStudents(parentIds: ID[], studentIds: ID[]): Promise<void>;
  abstract findUnarchiveStudentByNewIdOrThrow<
    FieldsToPopulate extends keyof StudentMetaData["populatedFields"] = never,
  >(
    studentNewId: string,
    option?: { populate: FieldsToPopulate[] },
  ): Promise<Populate<StudentMetaData, FieldsToPopulate>>;

  abstract findUnArchivedStudentsByIds(ids: ID[]): Promise<Student[]>;
  abstract removeParentsFromStudents(parentIds: ID[], studentIds: ID[]): Promise<void>;

  abstract listStudents(
    filter: {
      search?: string;
      gender?: string;
      level?: string;
      classTypeIds?: ID[];
      isArchived?: boolean;
      excludedIds?: ID[];
      isActive?: boolean;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<StudentMetaData, "classType" | "level" | "parents">>>;

  abstract find(filter: { search?: string }, options: { limit: number }): Promise<Student[]>;

  abstract listUnenrolledStudents(
    filter: {
      search?: string;
      classTypeId: ID;
      schoolYearId: ID;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Student>>;

  abstract findManyByFullNameAndIds: (
    fullName: string,
    ids: ID[],
  ) => Promise<StudentMetaData["entity"][]>;

  abstract findManyByClassType(classTypeId: ID): Promise<StudentMetaData["entity"][]>;

  abstract findManyByLevel<
    FieldsToPopulate extends keyof StudentMetaData["populatedFields"] = never,
  >(
    levelId: ID,
    options?: { populate?: FieldsToPopulate[] },
  ): Promise<Populate<StudentMetaData, FieldsToPopulate>[]>;

  abstract findManyByNextClassType(nextClassTypeId: ID): Promise<StudentMetaData["entity"][]>;

  abstract getAllUnArchivedStudent(): Promise<StudentMetaData["entity"][]>;

  abstract findManyByClassTypes(classTypeIds: ID[]): Promise<StudentMetaData["entity"][]>;

  abstract listAllUnenrolledStudents(schoolYearIds: ID[]): Promise<StudentMetaData["entity"][]>;

  abstract findUnArchivedStudentsByNewIds<
    FieldsToPopulate extends keyof StudentMetaData["populatedFields"] = never,
  >(studentNewIds: string[]): Promise<Populate<StudentMetaData, FieldsToPopulate>[]>;
}
