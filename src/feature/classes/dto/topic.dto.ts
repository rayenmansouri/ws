import { ID } from "../../../types/BaseEntity";
import { TTopicTypeEnum } from "../../examGrade/domain/tunisian/ExamGrade.entity";

export type TopicDto = {
  type: TTopicTypeEnum;
  _id: ID;
  newId: string;
  name: string;
};
