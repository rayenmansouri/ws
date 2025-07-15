import { TEstablishmentTitleEnum } from "../../../levels/domains/level.entity";

export type SecondaryGradeReportStatsDTO = {
  schoolYear: { name: string };
  school: {
    name: string;
    educationDepartment: string;
    establishmentTitle: TEstablishmentTitleEnum;
    _id: string;
  };
  studentNumber: number;
  class: { name: string };
  term: { name: string };
  headers: { topic: { name: string }; coefficient: number }[];
  studentStats: {
    fullName: string;
    average: string | null;
    rank: number | null;
    [key: string]: number | null | string;
  }[];
  topicsStats: {
    topicName: string;
    maxAverage: string | null;
    minAverage: string | null;
    topicAverage: string | null;
    teacher: string | null;
    avgRateAbove10: string;
  }[];
  totalAverage: {
    classAverage: string | null;
    maxAverage: string | null;
    minAverage: string | null;
    avgRateAbove10: string;
  };
};
