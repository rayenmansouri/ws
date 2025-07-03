import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSchoolController } from "./updateSchool.controller";
import { UpdateSchoolRouteConfig } from "./updateSchool.types";
import { updateSchoolValidation } from "./updateSchool.validation";

registerRoute<UpdateSchoolRouteConfig>()({
  path: "/school",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateSchoolValidation.body,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SCHOOL },
  controller: UpdateSchoolController,
  isTransactionEnabled: true,
  platform: "web",
  upload: {
    fields: [
      { name: "logo", maxCount: 1 },
      { name: "cover", maxCount: 1 },
      { name: "financeSignature", maxCount: 1 },
      { name: "academicSignature", maxCount: 1 },
    ],
  },
});
