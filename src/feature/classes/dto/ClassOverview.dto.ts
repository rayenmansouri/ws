import { EntityDto } from "../../entity/dto/entity.dto";
import { ID } from "./../../../types/BaseEntity";

export type ClassOverviewDTO = {
  classNewId: string;
  classId: string;
  className: string;
  levelId: string;
  schoolYearId: string;
  examGradeSystem: string | null;
  notAvailableTimes: { day: number; hours: number[] }[];
  maxHoursPerDay: number | null;
  maxGapsPerDay: number | null;
  maxContinuousHours: number | null;
  preferredClassroom: { _id: ID; newId: string; name: string } | null;
  classGroups: EntityDto[];
  classType: EntityDto;
};
