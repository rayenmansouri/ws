import { TMessageReactionTypeEnum } from "../../../../../feature/messages/domain/message.entity";
import { TEndUserEnum } from "./../../../../../constants/globalEnums";
import { ID } from "./../../../../../types/BaseEntity";

import { AddReactToMessageValidation } from "./AddReactToMessage.validation";

export type AddReactToMessageRouteConfig = AddReactToMessageValidation & { files: never };
export type AddReactToMessageResponse = void;
export type SendNotificationsParams = {
  senderId: ID;
  senderType: TEndUserEnum;
  userFullName: string;
  tenantId: string;
  reactionType: TMessageReactionTypeEnum;
  messageNewId: string;
  conversationNewId: string;
};
