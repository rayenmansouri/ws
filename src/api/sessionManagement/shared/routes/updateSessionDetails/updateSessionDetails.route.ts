import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdateSessionDetailsController } from "./updateSessionDetails.controller";
import { UpdateSessionDetailsRouteConfig } from "./updateSessionDetails.types";
import { updateSessionDetailsValidation } from "./updateSessionDetails.validation";

registerSharedRoute<UpdateSessionDetailsRouteConfig>()(
  {
    path: "/session/:sessionNewId/edit",
    method: "put",
    bodySchema: updateSessionDetailsValidation.body,
    paramSchema: updateSessionDetailsValidation.params,
    controller: UpdateSessionDetailsController,
    upload: { fields: [{ name: "attachments" }] },
    isTransactionEnabled: true,
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] },
  ],
);
