import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateBankCheckController } from "./updateBankCheck.controller";
import { UpdateBankCheckRouteConfig } from "./updateBankCheck.types";
import { updateBankCheckValidation } from "./updateBankCheck.validation";

registerRoute<UpdateBankCheckRouteConfig>()({
  path: "/bank-checks/:bankCheckNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateBankCheckValidation.body,
  paramSchema: updateBankCheckValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.BANK_CHECK },
  controller: UpdateBankCheckController,
  isTransactionEnabled: false,
  platform: "web",
});
