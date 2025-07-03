import { GroupDto } from "../../../../../feature/classes/dto/Group.dto";
import { CheckGroupValidation } from "./checkGroup.validation";

export type CheckGroupRouteConfig = CheckGroupValidation & { files: never };
export type CheckGroupResponse = GroupDto;
