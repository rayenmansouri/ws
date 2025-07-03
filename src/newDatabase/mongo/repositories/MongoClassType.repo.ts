import { injectable } from "inversify";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { ClassType, ClassTypeMetaData } from "../../../feature/classTypes/repo/classType.entity";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ResponseWithPagination } from "../types";
import { ListOptions } from "../../../types/types";
import { ID } from "../../../types/BaseEntity";
import { ClassTypeRepo } from "../../../feature/classTypes/repo/ClassType.repo";
import { Populate } from "../../../core/populateTypes";
import { stringsToObjectIds } from "../../../helpers/stringToObjectId";

@injectable()
export class MongoClassTypeRepo extends MongoBaseRepo<ClassTypeMetaData> implements ClassTypeRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "classType", session);
  }

  async findManyGroupedBySubLevel(
    subLevelIds: ID[],
  ): Promise<{ classTypes: ClassType[]; subLevelId: ID }[]> {
    type subLevelId = ID;

    type aggregateResult = { _id: subLevelId; classTypes: ClassType[] };
    type aggregateQuery = [
      { $match: FilterQuery<ClassType> },
      { $group: { _id: `$${keyof ClassType}`; classTypes: { $push: "$$ROOT" } } },
    ];

    const filterQuery: aggregateQuery = [
      { $match: { subLevel: { $in: stringsToObjectIds(subLevelIds) } } },
      { $group: { _id: "$subLevel", classTypes: { $push: "$$ROOT" } } },
    ];

    const docsResult = await this.model.aggregate<aggregateResult>(filterQuery);

    return docsResult.map(docResult => ({
      subLevelId: docResult._id,
      classTypes: docResult.classTypes,
    }));
  }

  async findManySubLevels(subLevelId: ID[]): Promise<ClassType[]> {
    return this.model.find({ subLevel: { $in: subLevelId } }).lean();
  }

  async findOneByExamType(examTypeId: ID): Promise<ClassType | null> {
    return this.model
      .findOne({
        $or: [
          { "subjects.exams.examType": examTypeId },
          { "subjects.subSubjects.exams.examType": examTypeId },
        ],
      })
      .lean();
  }

  async findManyBySubSubjectType(subSubjectTypeId: ID): Promise<ClassType[]> {
    return this.model.find({ "subjects.subSubjects.subSubjectType": subSubjectTypeId }).lean();
  }

  async findManyBySubjectType(subjectTypeId: ID): Promise<ClassType[]> {
    return this.model.find({ "subjects.subjectType": subjectTypeId }).lean();
  }

  async findManySection(sectionId: ID): Promise<ClassType[]> {
    return this.model.find({ section: sectionId }).lean();
  }

  async findManyBySubLevelsAndSection(subLevelIds: ID[], sectionId: ID): Promise<ClassType[]> {
    return this.model.find({ subLevel: { $in: subLevelIds }, section: sectionId }).lean();
  }

  async findManyByNextClassType(nextClassTypeId: ID): Promise<ClassTypeMetaData["entity"][]> {
    return this.model.find({ nextClassTypes: nextClassTypeId }).lean();
  }

  async addSubSubjectToClassType(
    classTypeId: ID,
    subjectTypeId: ID,
    data: ClassType["subjects"][0]["subSubjects"][0],
  ): Promise<void> {
    await this.model.updateOne(
      { _id: classTypeId, "subjects.subjectType": subjectTypeId },
      { $push: { "subjects.$.subSubjects": data } },
    );
  }

  async addSubjectToClassType(classTypeId: ID, data: ClassType["subjects"][0]): Promise<void> {
    await this.model.updateOne({ _id: classTypeId }, { $push: { subjects: data } });
  }

  async listClassTypes(
    filter: { search?: string; subLevelIds?: ID[]; sectionsIds?: ID[]; classTypeIds?: ID[] },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<Populate<ClassTypeMetaData, "section" | "subLevel" | "nextClassTypes">>
  > {
    const filterQuery: FilterQuery<ClassType> = {};

    if (filter.classTypeIds) filterQuery._id = { $in: stringsToObjectIds(filter.classTypeIds) };

    if (filter.search) filterQuery.name = { $regex: filter.search, $options: "i" };

    if (filter.subLevelIds) filterQuery.subLevel = { $in: filter.subLevelIds };
    if (filter.sectionsIds) filterQuery.section = { $in: filter.sectionsIds };

    const data = await this.findManyWithPagination(filterQuery, {
      ...options,
      populate: ["section", "subLevel", "nextClassTypes"],
    });

    return data;
  }

  async findManyBySublevels(subLevelIds: ID[]): Promise<ClassTypeMetaData["entity"][]> {
    return this.model.find({ subLevel: { $in: subLevelIds } });
  }

  async addActivityToClassType(classTypeId: ID, data: ClassType["activities"][0]): Promise<void> {
    await this.model.updateOne({ _id: classTypeId }, { $push: { activities: data } });
  }
}
