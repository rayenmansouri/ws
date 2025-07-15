import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListNotificationsController } from "./listNotifications.controller";
import { ListNotificationsRouteConfig } from "./listNotifications.types";
import { listNotificationsValidation } from "./listNotifications.validation";

registerSharedRoute<ListNotificationsRouteConfig>()(
  {
    path: "/notifications",
    method: "get",
    querySchema: listNotificationsValidation.query,
    controller: ListNotificationsController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
