import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { ID } from "../../../../../types/BaseEntity";
import { GetUsersOfPostForMentionValidation } from "./getUsersOfPostForMention.validation";

export type GetUsersOfPostForMentionRouteConfig = GetUsersOfPostForMentionValidation & {
  files: never;
};
export type GetUsersOfPostForMentionResponse = {
  type: TEndUserEnum;
  fullName: string;
  newId: string;
  _id: ID;
}[];
