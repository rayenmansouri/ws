import { ListOptions } from "../../../types/types";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { BaseRepo } from "../../../core/BaseRepo";
import { Teacher, TeacherMetaData } from "./teacher.entity";
import { TGenderEnum } from "../../users/domain/baseUser.entity";

export abstract class TeacherRepo extends BaseRepo<TeacherMetaData> {
  abstract listTeachers(
    filter: {
      search?: string;
      gender?: TGenderEnum;
      level?: ID;
      subjectType?: ID;
      groupType?: ID;
      isArchived?: boolean;
      isActive?: boolean;
    },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<Populate<TeacherMetaData, "levels" | "subjectTypes" | "groupTypes">>
  >;

  abstract find(filter: { search?: string }, options: { limit: number }): Promise<Teacher[]>;

  abstract findManyByFullNameAndIds: (
    fullName: string,
    ids: ID[],
  ) => Promise<TeacherMetaData["entity"][]>;

  abstract findManyByLevel(levelId: ID): Promise<Teacher[]>;

  abstract findManyBySubjectType(subjectTypeId: ID): Promise<Teacher[]>;

  abstract removeRoleFromTeacher(roleId: ID): Promise<void>;

  abstract findOneByPreferredClassroom(classroomId: ID): Promise<TeacherMetaData["entity"] | null>;

  abstract getNotArchivedTeachersCount(): Promise<number>;

  abstract findAllUnArchivedTeachers(): Promise<Teacher[]>;

  abstract resetNotAvailableTimesForAllTeachers(): Promise<void>;

  abstract findUnArchivedTeacherByIds<
    FieldsToPopulate extends keyof TeacherMetaData["populatedFields"] = never,
  >(
    teacherIds: ID[],
    option?: { populate: FieldsToPopulate[] },
  ): Promise<Populate<TeacherMetaData, FieldsToPopulate>[]>;
}
