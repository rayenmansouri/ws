import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ParentMetaData } from "./parent.entity";

export abstract class ParentRepo extends BaseRepo<ParentMetaData> {
  abstract addStudentsToParents(students: ID[], parents: ID[]): Promise<void>;
  abstract findUnarchiveParentByNewIdOrThrow<
    FieldsToPopulate extends keyof ParentMetaData["populatedFields"] = never,
  >(
    parentNewId: string,
    option?: { populate: FieldsToPopulate[] },
  ): Promise<Populate<ParentMetaData, FieldsToPopulate>>;

  abstract removeStudentsFromParents(students: ID[], parents: ID[]): Promise<void>;

  abstract listParentWithStudents(
    filter: {
      search?: string;
      isArchived?: boolean;
      isActive?: boolean;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<ParentMetaData, "students">>>;

  abstract findManyByFullName: (
    fullName: string,
    option?: { limit?: number },
  ) => Promise<ParentMetaData["entity"][]>;

  abstract findManyByFullNameAndIds: (
    fullName: string,
    ids: ID[],
  ) => Promise<ParentMetaData["entity"][]>;

  abstract removeStudentFromParents(parentIds: ID[], studentId: ID): Promise<void>;
  abstract getNotArchivedParentsCount(): Promise<number>;
}
