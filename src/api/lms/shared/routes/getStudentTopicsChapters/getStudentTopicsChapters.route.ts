import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetStudentTopicsChaptersController } from "./getStudentTopicsChapters.controller";
import { GetStudentTopicsChaptersRouteConfig } from "./getStudentTopicsChapters.types";
import { getStudentTopicsChaptersValidation } from "./getStudentTopicsChapters.validation";

registerSharedRoute<GetStudentTopicsChaptersRouteConfig>()(
  {
    path: "/chapters/topics",
    method: "get",
    querySchema: getStudentTopicsChaptersValidation.query,
    controller: GetStudentTopicsChaptersController,
    isTransactionEnabled: false,
  },
  [
    { endUser: END_USER_ENUM.PARENT, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.STUDENT, platforms: ["web", "mobile"] },
  ],
);
