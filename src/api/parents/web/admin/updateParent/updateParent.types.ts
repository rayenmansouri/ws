import { FilesInRequest } from "../../../../../types/app-request";
import { UpdateParentValidation } from "./updateParent.validation";

export type UpdateParentRouteConfig = UpdateParentValidation & {
  files: FilesInRequest<"avatar">;
};
export type UpdateParentResponse = void;
