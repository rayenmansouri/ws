import { UserProfileDTO } from "../../../../../feature/users/dtos/userProfile.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListUnenrolledStudentsForGroupValidation } from "./listUnenrolledStudentsForGroup.validation";

export type ListUnenrolledStudentsForGroupRouteConfig = ListUnenrolledStudentsForGroupValidation & {
  files: never;
};
export type ListUnenrolledStudentsForGroupResponse = ResponseWithPagination<UserProfileDTO>;
