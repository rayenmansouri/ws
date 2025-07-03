import { UpdateAppVersionValidation } from "./updateAppVersion.validation";

export type UpdateAppVersionRouteConfig = UpdateAppVersionValidation & { files: never };
export type UpdateAppVersionResponse = void;
