import { Participant } from "./../../../../../feature/messages/dtos/participant.dto";
import { ResponseWithPagination } from "./../../../../../newDatabase/mongo/types";

import { ListTargetUsersForGroupConversationAssignmentValidation } from "./listTargetUsersForGroupConversationAssignment.validation";

export type ListTargetUsersForGroupConversationAssignmentRouteConfig =
  ListTargetUsersForGroupConversationAssignmentValidation & { files: never };
export type ListTargetUsersForGroupConversationAssignmentResponse =
  ResponseWithPagination<Participant>;
