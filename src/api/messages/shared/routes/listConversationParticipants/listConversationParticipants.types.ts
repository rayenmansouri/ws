import { ConversationParticipantDTO } from "../../../../../feature/messages/useCases/ListConversationParticipants.usecase";
import { ResponseWithPagination } from "./../../../../../newDatabase/mongo/types";
import { ListConversationParticipantsValidation } from "./listConversationParticipants.validation";

export type ListConversationParticipantsRouteConfig = ListConversationParticipantsValidation & {
  files: never;
};
export type ListConversationParticipantsResponse =
  ResponseWithPagination<ConversationParticipantDTO>;
