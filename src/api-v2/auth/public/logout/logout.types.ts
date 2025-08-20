import { LogoutValidation } from "./logout.validation";

export type LogoutRouteConfig = LogoutValidation & { files: never };
export type LogoutResponse = null;
