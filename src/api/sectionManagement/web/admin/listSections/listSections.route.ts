import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListSectionsController } from "./listSections.controller";
import { ListSectionsRouteConfig } from "./listSections.types";
import { listSectionsValidation } from "./listSections.validation";

registerRoute<ListSectionsRouteConfig>()({
  path: "/sections",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listSectionsValidation.query,
  controller: ListSectionsController,
  isTransactionEnabled: false,
  platform: "web",
});
