import { GroupDto } from "../../../../../feature/classes/dto/Group.dto";
import { GetGroupsOfClassValidation } from "./getGroupsOfClass.validation";

export type GetGroupsOfClassRouteConfig = GetGroupsOfClassValidation & { files: never };
export type GetGroupsOfClassResponse = GroupDto[];
