import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { SendReplyController } from "./sendReply.controller";
import { SendReplyRouteConfig } from "./sendReply.types";
import { sendReplyValidation } from "./sendReply.validation";

registerSharedRoute<SendReplyRouteConfig>()(
  {
    path: "/issues/:issueNewId/replies",
    method: "post",
    bodySchema: sendReplyValidation.body,
    paramSchema: sendReplyValidation.params,
    controller: SendReplyController,
    isTransactionEnabled: true,
    upload: { fields: [{ name: "attachments" }] },
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
