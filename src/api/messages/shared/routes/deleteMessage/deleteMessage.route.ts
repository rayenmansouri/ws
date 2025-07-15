import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { DeleteMessageController } from "./deleteMessage.controller";
import { DeleteMessageRouteConfig } from "./deleteMessage.types";
import { deleteMessageValidation } from "./deleteMessage.validation";

registerSharedRoute<DeleteMessageRouteConfig>()(
  {
    path: "/messages/:messageNewId",
    method: "delete",
    paramSchema: deleteMessageValidation.params,
    controller: DeleteMessageController,
    isTransactionEnabled: true,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
  ],
);
