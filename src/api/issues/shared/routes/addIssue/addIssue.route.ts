import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { AddIssueController } from "./addIssue.controller";
import { AddIssueRouteConfig } from "./addIssue.types";
import { addIssueValidation } from "./addIssue.validation";

registerSharedRoute<AddIssueRouteConfig>()(
  {
    path: "/issues",
    method: "post",
    bodySchema: addIssueValidation.body,
    controller: AddIssueController,
    isTransactionEnabled: false,
    upload: { fields: [{ name: "attachments", maxCount: 1 }] },
  },
  [
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
  ],
);
