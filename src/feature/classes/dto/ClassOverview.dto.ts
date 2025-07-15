import { ID } from "./../../../types/BaseEntity";
import { GradeReportTemplateDTO } from "../../gradeReportTemplate/dtos/gradeReportTemplate.dto";
import { GroupDto } from "./Group.dto";
import { EntityDto } from "../../entity/dto/entity.dto";

export type ClassOverviewDTO = {
  classNewId: string;
  classId: string;
  className: string;
  levelId: string;
  schoolYearId: string;
  terms: {
    newId: string;
    _id: string;
    name: string;
    isLocked: boolean;
    isCompleted: boolean;
    isPublished: boolean;
  }[];
  currentTermNewId: string;
  examGradeSystem: string | null;
  gradeReportTemplates: GradeReportTemplateDTO[];
  notAvailableTimes: { day: number; hours: number[] }[];
  maxHoursPerDay: number | null;
  maxGapsPerDay: number | null;
  maxContinuousHours: number | null;
  preferredClassroom: { _id: ID; newId: string; name: string } | null;
  classGroups: EntityDto[];
  classType: EntityDto;
};
