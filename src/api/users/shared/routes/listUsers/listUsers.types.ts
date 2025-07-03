import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { UserProfileDTO } from "../../../../../feature/users/dtos/userProfile.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListUsersValidation } from "./listUsers.validation";

export type ListUsersRouteConfig = ListUsersValidation & { files: never };
export type ListUsersResponse = ResponseWithPagination<UserProfileDTO & { type: TEndUserEnum }>;
