import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ConfirmAttendanceController } from "./confirmAttendance.controller";
import { ConfirmAttendanceRouteConfig } from "./confirmAttendance.types";
import { confirmAttendanceValidation } from "./confirmAttendance.validation";

registerSharedRoute<ConfirmAttendanceRouteConfig>()(
  {
    path: "/session/:sessionNewId/confirm-attendance",
    method: "post",
    bodySchema: confirmAttendanceValidation.body,
    paramSchema: confirmAttendanceValidation.params,
    controller: ConfirmAttendanceController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SESSION },
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
