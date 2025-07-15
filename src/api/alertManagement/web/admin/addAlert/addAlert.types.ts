import { AddAlertValidation } from "./addAlert.validation";

export type AddAlertRouteConfig = AddAlertValidation & { files: never };
export type AddAlertResponse = void;
