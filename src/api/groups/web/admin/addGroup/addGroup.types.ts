import { GroupDto } from "../../../../../feature/classes/dto/Group.dto";
import { AddGroupValidation } from "./addGroup.validation";

export type AddGroupRouteConfig = AddGroupValidation & { files: never };
export type AddGroupResponse = GroupDto;
