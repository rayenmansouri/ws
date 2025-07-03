import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListClassesController } from "./listClasses.controller";
import { ListClassesRouteConfig } from "./listClasses.types";
import { listClassesValidation } from "./listClasses.validation";

registerSharedRoute<ListClassesRouteConfig>()(
  {
    path: "/list/classes",
    method: "get",
    querySchema: listClassesValidation.query,
    controller: ListClassesController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
