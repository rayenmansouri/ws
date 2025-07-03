import { AlertDetails } from "./../../../../../feature/alertManagement/dto/alert.dto";

import { GetAlertDetailsValidation } from "./getAlertDetails.validation";

export type GetAlertDetailsRouteConfig = GetAlertDetailsValidation & { files: never };
export type GetAlertDetailsResponse = AlertDetails;
