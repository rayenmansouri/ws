import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetOneIssueController } from "./getOneIssue.controller";
import { GetOneIssueRouteConfig } from "./getOneIssue.types";
import { getOneIssueValidation } from "./getOneIssue.validation";

registerSharedRoute<GetOneIssueRouteConfig>()(
  {
    path: "/issues/:issueNewId",
    method: "get",
    paramSchema: getOneIssueValidation.params,
    controller: GetOneIssueController,
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
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
