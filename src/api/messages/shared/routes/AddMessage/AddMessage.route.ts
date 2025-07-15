import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { AddMessageController } from "./AddMessage.controller";
import { AddMessageRouteConfig } from "./AddMessage.types";
import { AddMessageValidation } from "./AddMessage.validation";

registerSharedRoute<AddMessageRouteConfig>()(
  {
    path: "/messages",
    method: "post",
    bodySchema: AddMessageValidation.body,
    controller: AddMessageController,
    isTransactionEnabled: false,
    upload: { fields: [{ name: "files" }, { name: "media" }] },
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
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
