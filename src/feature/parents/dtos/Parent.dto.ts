import { EntityDto } from "../../entity/dto/entity.dto";
import { BaseListUserDTO } from "../../users/dtos/BaseListUser.dto";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";

export type ParentDTO = BaseListUserDTO & {
  nationalCardId: string | null;
  students: (UserProfileDTO & { gender: string; birthDate: Date })[];
};

export type ParentDetailsDTO = Omit<ParentDTO, "students"> & {
  students: (UserProfileDTO & { gender: string; birthDate: Date; schoolYears: EntityDto[] })[];
};
