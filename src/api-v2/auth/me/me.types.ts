import { BaseUser } from "../../../feature/user-management/base-user/domain/base-user.entity";
import { MeValidation } from "./me.validation";

export type MeRouteConfig = MeValidation & { files: never };

export type MeResponse = { user: BaseUser }
