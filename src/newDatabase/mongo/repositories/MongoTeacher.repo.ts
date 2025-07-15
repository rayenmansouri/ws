import { BadRequestError } from "./../../../core/ApplicationErrors";
import { Populate } from "./../../../core/populateTypes";
import { ListOptions } from "./../../../types/types";
import { ID } from "./../../../types/BaseEntity";
import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Teacher, TeacherMetaData } from "../../../feature/teachers/domain/teacher.entity";
import { TeacherRepo } from "../../../feature/teachers/domain/Teacher.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ResponseWithPagination } from "../types";
import { FilterQuery } from "mongoose";
import { TGenderEnum } from "../../../feature/users/domain/baseUser.entity";

export class MongoTeacherRepo extends MongoBaseRepo<TeacherMetaData> implements TeacherRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "teacher", session);
  }

  async find(filter: { search?: string }, options: { limit: number }): Promise<Teacher[]> {
    const query: FilterQuery<Teacher> = { isArchived: false, $or: [] };

    if (filter.search) {
      query.$or?.push(
        { fullName: { $regex: filter.search, $options: "i" } },
        { newId: { $regex: filter.search, $options: "i" } },
      );
    }

    const queryResultPromise = this.model.find(query);

    if (options?.limit != undefined && options.limit > 0) queryResultPromise.limit(options.limit);

    return queryResultPromise.lean();
  }

  async findOneByPreferredClassroom(classroomId: ID): Promise<TeacherMetaData["entity"] | null> {
    return this.model
      .findOne({ "constraints.preferredClassroom": classroomId, isArchived: false })
      .lean();
  }

  async findManyBySubjectType(subjectTypeId: ID): Promise<Teacher[]> {
    return this.model.find({ subjectTypes: subjectTypeId, isArchived: false }).lean();
  }

  async findManyByLevel(levelId: ID): Promise<Teacher[]> {
    return this.model.find({ levels: levelId, isArchived: false });
  }

  async listTeachers(
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
  > {
    const filterQuery: FilterQuery<Teacher> = {};

    if (filter.search) {
      filterQuery.$or = [];
      filterQuery.$or.push({ fullName: { $regex: filter.search, $options: "i" } });
      filterQuery.$or.push({ phoneNumber: { $regex: filter.search, $options: "i" } });
      filterQuery.$or.push({ newId: { $regex: filter.search, $options: "i" } });
    }

    if (filter.gender) filterQuery.gender = filter.gender;
    if (filter.isActive !== undefined) filterQuery.isActive = filter.isActive;

    if (filter.level) filterQuery.levels = filter.level;

    if (filter.subjectType) filterQuery.subjectTypes = { $in: [filter.subjectType] };

    if (filter.groupType) filterQuery.groupTypes = { $in: [filter.groupType] };

    const response = await this.findManyWithPagination(
      { ...filterQuery, isArchived: filter.isArchived === true ? true : false },
      {
        populate: ["levels", "groupTypes", "subjectTypes"],
        ...options,
      },
    );

    return response;
  }

  async findManyByFullNameAndIds(
    fullName: string,
    ids: ID[],
  ): Promise<TeacherMetaData["entity"][]> {
    const parents = await this.model.find({
      _id: { $in: ids },
      fullName: { $regex: fullName, $options: "i" },
      isArchived: false,
    });
    return parents;
  }

  async removeRoleFromTeacher(roleId: ID): Promise<void> {
    await this.model.updateMany(
      { roles: { $in: [roleId] } },
      { $pull: { roles: roleId } },
      { session: this.session },
    );
  }

  async getNotArchivedTeachersCount(): Promise<number> {
    return await this.model.count({ isArchived: false });
  }

  async findAllUnArchivedTeachers(): Promise<Teacher[]> {
    return await this.model.find({ isArchived: false }).lean();
  }

  async resetNotAvailableTimesForAllTeachers(): Promise<void> {
    await this.model.updateMany({}, { notAvailableTimes: [] }).session(this.session);
  }
  async findUnArchivedTeacherByIds<
    FieldsToPopulate extends keyof TeacherMetaData["populatedFields"],
  >(
    teacherIds: ID[],
    options?: {
      populate: FieldsToPopulate[];
    },
  ): Promise<Populate<TeacherMetaData, FieldsToPopulate>[]> {
    const teachers = await this.findManyByIds(teacherIds, {
      populate: options?.populate || [],
    });

    if (teachers.some(teacher => teacher.isArchived)) throw new BadRequestError("notFound.teacher");

    return teachers;
  }
}
