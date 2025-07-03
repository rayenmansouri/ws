import { ObservationDTO } from "../../../../../feature/observations/dtos/observation.dto";
import { FilesInRequest } from "../../../../../types/app-request";
import { AddObservationValidation } from "./addObservation.validation";

export type AddObservationRouteConfig = AddObservationValidation & {
  files: FilesInRequest<"files">;
};
export type AddObservationResponse = ObservationDTO;
