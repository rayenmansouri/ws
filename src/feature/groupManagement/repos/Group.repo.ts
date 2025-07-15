import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { GroupMetaData, Group } from "../domains/group.entity";

export abstract class GroupRepo extends BaseRepo<GroupMetaData> {
  abstract list(
    filter: {
      search?: string;
      levelIds?: ID[];
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Group>>;
  abstract find(filter: { search?: string }, options: { limit: number }): Promise<Group[]>;
  abstract findManyByIdsForGrades(ids: ID[]): Promise<Group[]>;

  abstract findManyByLevels(levelIds: ID[]): Promise<Group[]>;
  abstract findManyByStudentsAndSchoolYear(students: ID[], schoolYearId: ID): Promise<Group[]>;
  abstract findManyByGroupTypeAndSchoolYears<
    FieldsToPopulate extends keyof GroupMetaData["populatedFields"] = never,
  >(
    groupType: ID,
    schoolYearIds: ID[],
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<GroupMetaData, FieldsToPopulate>[]>;
  abstract findByTeacherAndSchoolYears(
    teacherId: ID,
    schoolYearIds: ID[],
    search?: string,
  ): Promise<Group[]>;

  abstract updateManyByGroupType(groupTypeId: ID, data: Partial<Group>): Promise<void>;

  abstract findManyByGroupTypes<
    FieldsToPopulate extends keyof GroupMetaData["populatedFields"] = never,
  >(
    groupsTypeIds: ID[],
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<GroupMetaData, FieldsToPopulate>[]>;
}
