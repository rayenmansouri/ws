import { FilesInRequest } from "../../../../../types/app-request";
import { AddAdminValidation } from "./addAdmin.validation";

export type AddAdminRouteConfig = AddAdminValidation & { files: FilesInRequest<"avatar"> };
export type AddAdminResponse = void;
