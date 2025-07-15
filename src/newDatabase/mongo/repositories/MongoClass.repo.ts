import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../../feature/classes/domain/Class.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { ClassMetaData, Class } from "../../../feature/classes/domain/class.entity";
import { Populate } from "../../../core/populateTypes";

export class MongoClassRepo extends MongoBaseRepo<ClassMetaData> implements ClassRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "class", session);
  }

  async getManyByStudents(studentIds: ID[], schoolYear: ID[]): Promise<ClassMetaData["entity"][]> {
    return this.model
      .find({ students: { $in: studentIds }, schoolYear: { $in: schoolYear } })
      .lean();
  }

  async findManyByClassTypes(classTypeId: ID[]): Promise<ClassMetaData["entity"][]> {
    return this.model.find({ classType: { $in: classTypeId } }).lean();
  }

  async find(filter: { search?: string }, options?: { limit: number }): Promise<Class[]> {
    const query: FilterQuery<Class> = { $or: [] };

    if (filter.search) {
      query.$or?.push(
        { name: { $regex: filter.search, $options: "i" } },
        { newId: { $regex: filter.search, $options: "i" } },
      );
    }

    const queryResultPromise = this.model.find(query);

    if (options?.limit != undefined && options.limit > 0) queryResultPromise.limit(options.limit);

    return queryResultPromise.lean();
  }

  async findOneByPreferredClassroom(classroomId: ID): Promise<ClassMetaData["entity"] | null> {
    return this.model.findOne({ "constraints.preferredClassroom": classroomId }).lean();
  }

  async removeSubject(classIds: ID[], subjectId: ID): Promise<void> {
    await this.model.updateMany(
      { _id: { $in: classIds } },
      { $set: { [`subjectTeacherMap.${subjectId}`]: null } },
    );
  }

  async removeSubSubject(classIds: ID[], subSubjectId: ID): Promise<void> {
    await this.model.updateMany(
      { _id: { $in: classIds } },
      { $set: { [`subSubjectTeacherMap.${subSubjectId}`]: null } },
    );
  }

  async findManyByClassTypeInSchoolYear(
    classTypeId: ID,
    schoolYearId: ID,
  ): Promise<ClassMetaData["entity"][]> {
    return await this.model.find({ classType: classTypeId, schoolYear: schoolYearId }).lean();
  }

  async findManyByClassType(classTypeId: ID): Promise<ClassMetaData["entity"][]> {
    return this.model.find({ classType: classTypeId }).lean();
  }

  async addSubjectType(classTypeId: ID, subjectType: ID): Promise<void> {
    await this.model.updateMany(
      { classType: classTypeId },
      { [`subjectTeacherMap.${subjectType}`]: null },
    );
  }

  async findGeneratedTermByClassTypeInSchoolYear(
    classTypeId: ID,
    schoolYearId: ID,
  ): Promise<ClassMetaData["entity"] | null> {
    return this.model
      .findOne({
        classType: classTypeId,
        "gradeReports.term": { $exists: true },
        schoolYear: schoolYearId,
      })
      .lean();
  }

  async listClasses(
    filter: { search?: string; classType?: ID[]; schoolYears?: ID[] },
    options?: ListOptions,
  ): Promise<ResponseWithPagination<Class>> {
    const filterQuery: FilterQuery<Class> = {};

    if (filter.schoolYears) filterQuery.schoolYear = { $in: filter.schoolYears };

    if (filter.search) filterQuery.name = { $regex: filter.search, $options: "i" };

    if (filter.classType) filterQuery.classType = { $in: filter.classType };

    const data = await this.findManyWithPagination(filterQuery, options);

    return data;
  }

  async incompleteTerm(classId: ID, termId: ID): Promise<void> {
    await this.model.updateOne({ _id: classId }, { $pull: { gradeReports: { term: termId } } });
  }

  async completeTerm(classId: ID, termId: ID): Promise<void> {
    await this.model.updateOne(
      { _id: classId },
      { $push: { gradeReports: { term: termId, isPublished: false } } },
    );
  }

  async findByName(className: string): Promise<ClassMetaData["entity"] | null> {
    return this.model.findOne({ name: className }).lean();
  }

  async switchStudentClass(studentId: ID, currentClassId: ID, newClassId: ID): Promise<void> {
    await Promise.all([
      this.model.updateOne(
        { _id: currentClassId },
        { $pull: { students: studentId } },
        { session: this.session },
      ),
      this.model.updateOne(
        { _id: newClassId },
        { $push: { students: studentId } },
        { session: this.session },
      ),
    ]);
  }

  async getClassesCountOfSchoolYear(schoolYearsIds: ID[]): Promise<ClassMetaData["entity"][]> {
    return await this.model.find({ schoolYear: { $in: schoolYearsIds } });
  }

  async getClassesCountOfSchoolYearAndClassTypes(
    schoolYearId: ID,
    classTypes: ID[],
  ): Promise<number> {
    return this.model.count({
      schoolYear: schoolYearId,
      classType: { $in: classTypes },
    });
  }

  async publishTerm(classId: ID, termId: ID): Promise<void> {
    await this.model.updateOne(
      { _id: classId, "gradeReports.term": termId },
      { $set: { "gradeReports.$.isPublished": true } },
    );
  }

  async hideTerm(classId: ID, termId: ID): Promise<void> {
    await this.model.updateOne(
      { _id: classId, "gradeReports.term": termId },
      { $set: { "gradeReports.$.isPublished": false } },
    );
  }

  async findBySchoolYearIds<
    FieldsToPopulate extends keyof ClassMetaData["populatedFields"] = never,
  >(
    schoolYearIds: ID[],
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<ClassMetaData, FieldsToPopulate>[]> {
    const query = this.model.find({ schoolYear: { $in: schoolYearIds } });

    if (options?.populate) query.populate(options.populate);

    return await query.lean();
  }

  async resetNotAvailableTimesForAllClasses(): Promise<void> {
    await this.model.updateMany({}, { notAvailableTimes: [] }).session(this.session);
  }

  async ensureNameIsUniqueInSchoolYear(name: string, schoolYearId: ID): Promise<void> {
    const classDoc = await this.model.findOne({ name, schoolYear: schoolYearId });

    if (classDoc) throw new Error("alreadyUsed.name");
  }
}
