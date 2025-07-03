import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { AddReactToMessageController } from "./AddReactToMessage.controller";
import { AddReactToMessageRouteConfig } from "./AddReactToMessage.types";
import { AddReactToMessageValidation } from "./AddReactToMessage.validation";

registerSharedRoute<AddReactToMessageRouteConfig>()(
  {
    path: "/messages/:messageNewId/react",
    method: "put",
    bodySchema: AddReactToMessageValidation.body,
    paramSchema: AddReactToMessageValidation.params,
    controller: AddReactToMessageController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
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
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
