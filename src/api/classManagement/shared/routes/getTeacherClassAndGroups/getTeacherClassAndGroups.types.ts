import { EntityDto } from "../../../../../feature/entity/dto/entity.dto";
import { GetTeacherClassAndGroupsValidation } from "./getTeacherClassAndGroups.validation";

export type GetTeacherClassAndGroupsRouteConfig = GetTeacherClassAndGroupsValidation & {
  files: never;
};
export type GetTeacherClassAndGroupsResponse = (EntityDto & { isGroup: boolean })[];
