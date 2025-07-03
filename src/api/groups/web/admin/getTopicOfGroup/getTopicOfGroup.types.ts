import { EntityDto } from "../../../../../feature/entity/dto/entity.dto";
import { UserProfileDTO } from "../../../../../feature/users/dtos/userProfile.dto";
import { GetTopicOfGroupValidation } from "./getTopicOfGroup.validation";

export type GetTopicOfGroupRouteConfig = GetTopicOfGroupValidation & {
  files: never;
};
export type GetTopicOfGroupResponse = (EntityDto & {
  teacher: UserProfileDTO;
})[];
