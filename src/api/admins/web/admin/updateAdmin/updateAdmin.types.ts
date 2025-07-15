import { FilesInRequest } from "../../../../../types/app-request";
import { UpdateAdminValidation } from "./updateAdmin.validation";

export type UpdateAdminRouteConfig = UpdateAdminValidation & {
  files: FilesInRequest<"avatar">;
};
export type UpdateAdminResponse = void;
