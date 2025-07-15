import { EntityDto } from "../../entity/dto/entity.dto";
import { BaseListUserDTO } from "../../users/dtos/BaseListUser.dto";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";

export type StudentDto = BaseListUserDTO & {
  level: EntityDto;
  parents: UserProfileDTO[];
  classType: EntityDto;
  uniqueId: string | null;
};
