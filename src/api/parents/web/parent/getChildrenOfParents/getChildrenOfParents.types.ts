import { UserProfileDTO } from "../../../../../feature/users/dtos/userProfile.dto";
import { GetChildrenOfParentsValidation } from "./getChildrenOfParents.validation";

export type GetChildrenOfParentsRouteConfig = GetChildrenOfParentsValidation & { files: never };
export type GetChildrenOfParentsResponse = UserProfileDTO[];
