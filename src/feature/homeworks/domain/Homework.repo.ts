import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { TTopicTypeEnum } from "../../examGrade/domain/tunisian/ExamGrade.entity";
import { THomeworkStatusEnum } from "../../../features/homework/constants/shared/addHomework.constants";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { Homework, HomeworkMetaData } from "./homework.entity";

export abstract class HomeworkRepo extends BaseRepo<HomeworkMetaData> {
  abstract deleteManyByClass(classId: ID): Promise<void>;

  abstract deleteManyByGroup(groupId: ID): Promise<void>;

  abstract findManyByClassesAndTopic(
    classIds: ID[],
    topicId: ID,
    topicType: TTopicTypeEnum,
  ): Promise<Homework[]>;

  abstract listHomeworks<
    FieldsToPopulate extends keyof HomeworkMetaData["populatedFields"] = never,
  >(
    filter: {
      teacherIds?: ID[];
      classId?: ID;
      groupIds?: ID[] | undefined;
      search?: string;
      status?: THomeworkStatusEnum;
      excludeEmptyFiles?: boolean;
      subjectTypeIds?: ID[];
    },
    options: ListOptions & {
      populate?: FieldsToPopulate[];
    },
  ): Promise<ResponseWithPagination<Populate<HomeworkMetaData, FieldsToPopulate>>>;
}
