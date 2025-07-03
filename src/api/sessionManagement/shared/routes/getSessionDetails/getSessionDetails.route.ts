import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetSessionDetailsController } from "./getSessionDetails.controller";
import { GetSessionDetailsRouteConfig } from "./getSessionDetails.types";
import { getSessionDetailsValidation } from "./getSessionDetails.validation";

registerSharedRoute<GetSessionDetailsRouteConfig>()(
  {
    path: "/sessions/:sessionNewId",
    method: "get",
    paramSchema: getSessionDetailsValidation.params,
    controller: GetSessionDetailsController,
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
