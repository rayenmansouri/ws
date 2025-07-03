import { DeleteAlertValidation } from "./deleteAlert.validation";

export type DeleteAlertRouteConfig = DeleteAlertValidation & { files: never };
export type DeleteAlertResponse = void;
