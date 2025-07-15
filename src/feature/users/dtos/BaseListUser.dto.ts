import { UserProfileDTO } from "./userProfile.dto";

export type BaseListUserDTO = UserProfileDTO & {
  address1: string | null;
  address2: string | null;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  isActive: boolean;
  isArchived: boolean;
  gender: string;
};
