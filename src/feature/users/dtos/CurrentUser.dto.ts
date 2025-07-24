import { ID } from "../../../types/BaseEntity";
import { TFeatureFlagsEnum } from "../../schools/constants/featureFlags";

export type CurrentUserDTO = {
  _id: ID;
  newId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
  gender: string;
  address1: string | null;
  address2: string | null;
  phoneNumber: string | null;
  birthDate: Date | null;
  email: string | null;
  roles: {
    _id: ID;
    newId: string;
    name: string;
    permissions: string[];
  }[];
  unseenNotification: number;
  unseenConversations: number;
  schoolId: string;
  schoolLogo: string | null;
  schoolCover: string;
  schoolSubdomain: string;
  schoolName: string;
  taxRate: number;
  featureFlags: Record<TFeatureFlagsEnum, boolean>;
  schedule: {
    startHour: number;
    endHour: number;
    step: number;
    days: number[];
  };
};
