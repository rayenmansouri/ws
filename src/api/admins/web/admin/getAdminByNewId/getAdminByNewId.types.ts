import { AdminDTO } from "../../../../../feature/admins/dtos/Admin.dto";
import { GetAdminByNewIdValidation } from "./getAdminByNewId.validation";

export type GetAdminByNewIdRouteConfig = GetAdminByNewIdValidation & { files: never };
export type GetAdminByNewIdResponse = AdminDTO;
