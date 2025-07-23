import { EntityDto } from "../../entity/dto/entity.dto";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { SchoolYearDto } from "./../../schoolYears/dtos/schoolYear.dto";

export type StudentProfileDTO = {
  _id: string;
  newId: string;
  uniqueId: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string | null;
  phoneNumber: string | null;
  avatar: string;
  gender: string;
  birthDate: Date | null;
  address1: string | null;
  address2: string | null;
  parents: UserProfileDTO[];
  classType: { _id: string; newId: string; name: string };
  class: { _id: string; newId: string; name: string } | null;
  level: { _id: string; newId: string; name: string } | null;
  isEnrolled: boolean;
  groups: (EntityDto & {
    groupTypeName: string;
  })[];
  schoolYears: SchoolYearDto[];
  selectedSchoolYear: SchoolYearDto;
};
