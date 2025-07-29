import { TTopicTypeEnum } from "../../../helpers/constants";
import { ID } from "../../../types/BaseEntity";

export type TopicDto = {
  type: TTopicTypeEnum;
  _id: ID;
  newId: string;
  name: string;
};
