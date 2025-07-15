import { addParticipantToGroupValidation } from "./addParticipantToGroup.validation";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { AddParticipantToGroupController } from "./addParticipantToGroup.controller";
import { AddParticipantToGroupRouteConfig } from "./addParticipantToGroup.types";

registerSharedRoute<AddParticipantToGroupRouteConfig>()(
  {
    path: "/conversations/:conversationNewId/add-participant-members",
    method: "post",
    bodySchema: addParticipantToGroupValidation.body,
    paramSchema: addParticipantToGroupValidation.params,
    controller: AddParticipantToGroupController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
  ],
);
