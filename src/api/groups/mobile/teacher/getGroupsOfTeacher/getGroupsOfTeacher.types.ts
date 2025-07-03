import { GroupDto } from "../../../../../feature/classes/dto/Group.dto";
import { GetGroupsOfTeacherValidation } from "./getGroupsOfTeacher.validation";

export type GetGroupsOfTeacherRouteConfig = GetGroupsOfTeacherValidation & { files: never };
export type GetGroupsOfTeacherResponse = GroupDto[];
