import { SessionDetailsDTO } from "../../../../../feature/sessionManagement/dtos/sessionDetails.dto";
import { FilesInRequest } from "../../../../../types/app-request";
import { UpdateSessionDetailsValidation } from "./updateSessionDetails.validation";

export type UpdateSessionDetailsRouteConfig = UpdateSessionDetailsValidation & {
  files: FilesInRequest<"attachments">;
};
export type UpdateSessionDetailsResponse = SessionDetailsDTO;
