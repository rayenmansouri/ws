import { UpdateSessionStatusUseCaseResponse } from "../../../../../feature/sessionManagement/useCases/updateSessionStatus.usecase";
import { UpdateSessionStatusValidation } from "./updateSessionStatus.validation";

export type UpdateSessionStatusRouteConfig = UpdateSessionStatusValidation & { files: never };
export type UpdateSessionStatusResponse = UpdateSessionStatusUseCaseResponse;
