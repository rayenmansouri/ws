import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { TogglePinStatusOfPostController } from "./togglePinStatusOfPost.controller";
import { TogglePinStatusOfPostRouteConfig } from "./togglePinStatusOfPost.types";
import { togglePinStatusOfPostValidation } from "./togglePinStatusOfPost.validation";

registerSharedRoute<TogglePinStatusOfPostRouteConfig>()(
  {
    path: "/posts/:postNewId/pin-status",
    method: "patch",
    paramSchema: togglePinStatusOfPostValidation.params,
    controller: TogglePinStatusOfPostController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
  ],
);
