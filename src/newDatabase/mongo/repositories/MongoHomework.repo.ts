import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Populate } from "../../../core/populateTypes";
import { HomeworkRepo } from "../../../feature/homeworks/domain/Homework.repo";
import { Homework, HomeworkMetaData } from "../../../feature/homeworks/domain/homework.entity";
import { THomeworkStatusEnum } from "../../../features/homework/constants/shared/addHomework.constants";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { MongoBaseRepo } from "./MongoBase.repo";
import { TTopicTypeEnum } from "../../../feature/examGrade/domain/tunisian/ExamGrade.entity";

export class MongoHomeworkRepo extends MongoBaseRepo<HomeworkMetaData> implements HomeworkRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "homework", session);
  }

  async findManyByClassesAndTopic(
    classIds: ID[],
    topicId: ID,
    topicType: TTopicTypeEnum,
  ): Promise<Homework[]> {
    return this.model.find({ class: { $in: classIds }, [topicType]: topicId }).lean();
  }

  async listHomeworks<FieldsToPopulate extends keyof HomeworkMetaData["populatedFields"] = never>(
    filter: {
      teacherIds?: ID[];
      classId?: ID;
      groupIds?: ID[];
      status?: THomeworkStatusEnum;
      search?: string;
      excludeEmptyFiles?: boolean;
      subjectTypeIds?: ID[];
      fileName?: string;
    },
    options: ListOptions & {
      populate?: FieldsToPopulate[];
    },
  ): Promise<ResponseWithPagination<Populate<HomeworkMetaData, FieldsToPopulate>>> {
    const filterQuery: FilterQuery<Homework> = {};

    if (filter.classId || filter.groupIds) {
      filterQuery.$or = [];

      if (filter.classId && filter.classId.length > 0)
        filterQuery.$or.push({ class: filter.classId });

      if (filter.groupIds && filter.groupIds.length > 0)
        filterQuery.$or.push({ group: { $in: filter.groupIds } });
    }

    if (filter.teacherIds && filter.teacherIds.length > 0)
      filterQuery.teacher = { $in: filter.teacherIds };

    if (filter.status) filterQuery.status = filter.status;

    if (filter.search) filterQuery.name = { $regex: filter.search, $options: "i" };
    if (filter.fileName) filterQuery["files.name"] = { $regex: filter.fileName, $options: "i" };

    if (filter.subjectTypeIds && filter.subjectTypeIds.length > 0)
      filterQuery.subjectType = { $in: filter.subjectTypeIds };

    if (filter.excludeEmptyFiles === true) filterQuery.files = { $exists: true, $ne: [] };

    const data = await this.findManyWithPagination(filterQuery, {
      ...options,
      sort: { dueDate: -1 },
      populate: options.populate,
    });

    return data;
  }

  async deleteManyByClass(classId: ID): Promise<void> {
    await this.model.deleteMany({ class: classId });
  }
  async deleteManyByGroup(groupId: ID): Promise<void> {
    await this.model.deleteMany({ group: groupId });
  }
}
