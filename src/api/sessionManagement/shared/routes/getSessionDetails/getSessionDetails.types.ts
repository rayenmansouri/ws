import { SessionDetailsDTO } from "./../../../../../feature/sessionManagement/dtos/sessionDetails.dto";
import { GetSessionDetailsValidation } from "./getSessionDetails.validation";

export type GetSessionDetailsRouteConfig = GetSessionDetailsValidation & { files: never };
export type GetSessionDetailsResponse = SessionDetailsDTO;
