import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListChapterDocumentsController } from "./listChapterDocuments.controller";
import { ListChapterDocumentsRouteConfig } from "./listChapterDocuments.types";
import { listChapterDocumentsValidation } from "./listChapterDocuments.validation";

registerSharedRoute<ListChapterDocumentsRouteConfig>()(
  {
    path: "/chapters/documents",
    method: "get",
    querySchema: listChapterDocumentsValidation.query,
    controller: ListChapterDocumentsController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.LMS },
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.LMS },
      platforms: ["web"],
    },
  ],
);
