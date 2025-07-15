import { Participant } from "./../../../../../feature/messages/dtos/participant.dto";

import { GetMessageTargetUsersValidation } from "./getMessageTargetUsers.validation";

export type GetMessageTargetUsersRouteConfig = GetMessageTargetUsersValidation & { files: never };
export type GetMessageTargetUsersResponse = Participant[];
