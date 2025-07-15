import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetLevelDegreesCoverageController } from "./getLevelDegreesCoverage.controller";
import { GetLevelDegreesCoverageRouteConfig } from "./getLevelDegreesCoverage.types";

registerRoute<GetLevelDegreesCoverageRouteConfig>()({
  path: "/levels/degrees-coverage",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SCHOOL_YEAR },
  controller: GetLevelDegreesCoverageController,
  isTransactionEnabled: false,
  platform: "web",
});
