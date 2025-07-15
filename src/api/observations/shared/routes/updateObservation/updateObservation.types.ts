import { FilesInRequest } from "../../../../../types/app-request";
import { UpdateObservationValidation } from "./updateObservation.validation";

export type UpdateObservationRouteConfig = UpdateObservationValidation & {
  files: FilesInRequest<"files">;
};
export type UpdateObservationResponse = void;
