import { SchoolYearDto } from "./../../schoolYears/dtos/schoolYear.dto";
import { ID } from "./../../../types/BaseEntity";
import { EntityDto } from "../../entity/dto/entity.dto";
import { ClassDTO } from "../../classes/dto/Classes.dto";

export type TeacherProfileDTO = {
  _id: string;
  newId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string | null;
  email: string | null;
  gender: string;
  birthDate: Date | null;
  avatar: string;
  address1: string | null;
  address2: string | null;
  subjectTypes: EntityDto[];
  groupTypes: EntityDto[];
  classes: ClassDTO[];
  isPaymentConfigured: boolean;
  topics: EntityDto[];
  roles: EntityDto[];
  notAvailableTimes: { day: number; hours: number[] }[];
  levels: EntityDto[];
  maxDaysPerWeek: number | null;
  maxHoursPerDay: number | null;
  maxGapsPerDay: number | null;
  preferredClassroom: {
    _id: ID;
    newId: string;
    name: string;
  } | null;
  schoolYears: SchoolYearDto[];
  selectedSchoolYear: SchoolYearDto;
};
