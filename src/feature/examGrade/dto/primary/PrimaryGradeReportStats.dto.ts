import { TEstablishmentTitleEnum } from "../../../levels/domains/level.entity";

export type PrimaryGradeReportStatsDTO = {
  school: {
    name: string;
    educationDepartment: string;
    establishmentTitle: TEstablishmentTitleEnum;
    _id: string;
  };
  schoolYear: { name: string };
  term: { name: string };
  level: { name: string };
  class: { name: string };
  studentNumber: number;
  headers: {
    fieldName: string;
    topics: {
      name: string;
    }[];
  }[];
  studentStats: {
    diploma: { name: string } | null;
    average: string | null;
    rank: number | null;
    fullName: string;
    fields: {
      [key: string]: string | number | null;
      rank: number | null;
      average: string | null;
      name: string;
    }[];
  }[];
  fields: {
    name: string;
    subjects: {
      name: string;
      highestGrade: string | null;
      lowestGrade: string | null;
      averageOfClass: string | null;
      studentBelowAverage: string;
      studentAboveAverage: string;
    }[];
    fieldStats: {
      highestGrade: string | null;
      lowestGrade: string | null;
      averageOfClass: string | null;
      studentBelowAverage: string;
      studentAboveAverage: string;
    };
  }[];
  globalStats: {
    termAverage: string | null;
    fieldAverages: {
      name: string;
      average: string | null;
    }[];
    diplomaNumbers: {
      name: string;
      number: number;
    }[];
    studentBelowAverageNumber: number;
    studentBelowAveragePercentage: string;
    studentAboveAverageNumber: number;
    studentAboveAveragePercentage: string;
  };
};
