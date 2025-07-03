import { UserProfileDTO } from "../../../../../feature/users/dtos/userProfile.dto";
import { FilesInRequest } from "../../../../../types/app-request";
import { AddParentValidation } from "./addParent.validation";

export type AddParentRouteConfig = AddParentValidation & { files: FilesInRequest<"avatar"> };
export type AddParentResponse = UserProfileDTO;
