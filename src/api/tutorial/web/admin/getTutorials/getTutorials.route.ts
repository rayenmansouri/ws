import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetTutorialsController } from "./getTutorials.controller";
import { GetTutorialsRouteConfig } from "./getTutorials.types";
import { getTutorialValidation } from "./getTutorials.validation";

registerRoute<GetTutorialsRouteConfig>()({
  path: "/tutorials",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getTutorialValidation.query,
  controller: GetTutorialsController,
  isTransactionEnabled: false,
  platform: "web",
});
