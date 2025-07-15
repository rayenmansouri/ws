import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { DeleteParticipantFromGroupController } from "./deleteParticipantFromGroup.controller";
import { DeleteParticipantFromGroupRouteConfig } from "./deleteParticipantFromGroup.types";
import { deleteParticipantFromGroupValidation } from "./deleteParticipantFromGroup.validation";

registerSharedRoute<DeleteParticipantFromGroupRouteConfig>()(
  {
    path: "/conversations/:conversationNewId/remove-participant-members",
    method: "put",
    bodySchema: deleteParticipantFromGroupValidation.body,
    paramSchema: deleteParticipantFromGroupValidation.params,
    controller: DeleteParticipantFromGroupController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
  ],
);
