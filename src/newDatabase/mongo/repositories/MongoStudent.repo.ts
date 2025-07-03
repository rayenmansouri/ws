import { injectable } from "inversify";
import { ClientSession, Connection, FilterQuery, PipelineStage, Types } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { StudentMetaData } from "../../../feature/students/domain/student.entity";
import { StudentRepo } from "../../../feature/students/domain/Student.repo";
import { ID } from "../../../types/BaseEntity";
import { ResponseWithPagination } from "../types";
import { Student } from "../../../feature/students/domain/student.entity";
import { ListOptions } from "./../../../types/types";
import { MongoBaseRepo } from "./MongoBase.repo";
import { Populate } from "../../../core/populateTypes";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { StudentService } from "../../../feature/students/domain/Student.service";

@injectable()
export class MongoStudentRepo extends MongoBaseRepo<StudentMetaData> implements StudentRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "student", session);
  }

  async findUnArchivedStudentsByIds(ids: ID[]): Promise<Student[]> {
    const students = await this.findManyByIds(ids);

    if (students.length != ids.length) throw new NotFoundError("notFound.student");

    students.forEach(StudentService.ensureStudentNotArchived);

    return students;
  }

  async find(filter: { search?: string }, options: { limit: number }): Promise<Student[]> {
    const query: FilterQuery<Student> = { isArchived: false, $or: [] };

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

  async findManyByLevel<FieldsToPopulate extends keyof StudentMetaData["populatedFields"] = never>(
    levelId: ID,
    options?: { populate?: FieldsToPopulate[] },
  ): Promise<Populate<StudentMetaData, FieldsToPopulate>[]> {
    const query = this.model.find({ level: levelId });

    if (options?.populate) query.populate(options.populate as string[]);

    return await query.lean();
  }

  async findManyByClassType(classTypeId: ID): Promise<StudentMetaData["entity"][]> {
    return this.model.find({ classType: classTypeId }).lean();
  }

  async findManyByNextClassType(nextClassTypeId: ID): Promise<StudentMetaData["entity"][]> {
    return this.model.find({ nextClassType: nextClassTypeId }).lean();
  }

  async addParentsToStudents(parentIds: ID[], studentIds: ID[]): Promise<void> {
    await this.model.updateMany(
      { _id: { $in: studentIds } },
      { $push: { parents: parentIds } },
      { session: this.session || undefined },
    );
  }

  async removeParentsFromStudents(parentIds: ID[], studentIds: ID[]): Promise<void> {
    await this.model.updateMany(
      { _id: { $in: studentIds } },
      { $pull: { parents: { $in: parentIds } } },
      { session: this.session || undefined },
    );
  }

  async listStudents(
    filter: {
      search?: string;
      gender?: string;
      level?: string;
      classTypeIds?: ID[];
      isArchived?: boolean;
      excludedIds?: ID[];
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<StudentMetaData, "classType" | "level" | "parents">>> {
    const filterQuery: FilterQuery<Student> = {};

    if (filter.gender) filterQuery.gender = filter.gender;

    if (filter.level) filterQuery.level = filter.level;

    if (filter.classTypeIds) filterQuery.classType = { $in: filter.classTypeIds };

    if (filter.excludedIds) filterQuery._id = { $nin: filter.excludedIds };

    if (filter.search)
      filterQuery.$or = [
        { fullName: { $regex: filter.search, $options: "i" } },
        { newId: { $regex: filter.search, $options: "i" } },
      ];

    const response = await this.findManyWithPagination(
      { ...filterQuery, isArchived: filter.isArchived === true ? true : false },
      {
        ...options,
        populate: ["classType", "level", "parents"],
      },
    );

    return response;
  }

  async listUnenrolledStudents(
    filter: { search?: string; classTypeId: ID; schoolYearId: ID },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Student>> {
    const matchStage: PipelineStage = {
      $match: {
        isArchived: false,
        classType: new Types.ObjectId(filter.classTypeId),
      },
    };

    if (filter.search) matchStage.$match.fullName = { $regex: filter.search, $options: "i" };

    const data = await this.aggregateWithPagination<Student>(
      [
        matchStage,
        {
          $lookup: {
            from: "studentprofiles",
            let: { student: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $and: [{ $eq: ["$student", "$$student"] }] },
                  schoolYear: new Types.ObjectId(filter.schoolYearId),
                },
              },
            ],
            as: "profile",
          },
        },
        { $unwind: "$profile" },
        { $match: { "profile.class": null } },
      ],
      options,
    );

    return data;
  }

  async findManyByFullNameAndIds(
    fullName: string,
    ids: ID[],
  ): Promise<StudentMetaData["entity"][]> {
    const parents = await this.model.find({
      _id: { $in: ids },
      fullName: { $regex: fullName, $options: "i" },
    });
    return parents;
  }

  async getAllUnArchivedStudent(): Promise<StudentMetaData["entity"][]> {
    return await this.model.find({ isArchived: false });
  }

  async findManyByClassTypes(classTypeIds: ID[]): Promise<StudentMetaData["entity"][]> {
    return this.model.find({
      classType: { $in: classTypeIds },
      isArchived: false,
    });
  }

  async listAllUnenrolledStudents(schoolYearIds: ID[]): Promise<StudentMetaData["entity"][]> {
    const data = await this.model.aggregate<Student>([
      {
        $match: {
          isArchived: false,
        },
      },
      {
        $lookup: {
          from: "studentprofiles",
          let: { student: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $and: [{ $eq: ["$student", "$$student"] }] },
                schoolYear: { $in: schoolYearIds.map(id => new Types.ObjectId(id)) },
              },
            },
          ],
          as: "profile",
        },
      },
      { $unwind: "$profile" },
      { $match: { "profile.class": null } },
    ]);

    return data;
  }

  async findUnArchivedStudentsByNewIds<
    FieldsToPopulate extends keyof StudentMetaData["populatedFields"],
  >(
    studentNewIds: string[],
    options?: {
      populate: FieldsToPopulate[];
    },
  ): Promise<Populate<StudentMetaData, FieldsToPopulate>[]> {
    const students = await this.findManyByNewIdsOrThrow(studentNewIds, "notFound.student", {
      populate: options?.populate,
    });

    if (students.some(student => student.isArchived)) throw new NotFoundError("notFound.student");

    return students;
  }
}
