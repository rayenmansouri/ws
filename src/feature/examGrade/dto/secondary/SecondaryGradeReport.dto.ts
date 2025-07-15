import {
  TEstablishmentTitleEnum,
  TExamGradeSystemEnum,
} from "../../../levels/domains/level.entity";
import { TPromotionStatusEnum } from "../../domain/tunisian/ExamGrade.entity";

export type SecondaryGradeReportDTO = {
  examGradeSystem: TExamGradeSystemEnum | null;
  student: {
    _id: string;
    newId: string;
    fullName: string;
    className: string;
    uniqueId: string | null;
  };
  school: {
    _id: string;
    name: string;
    address: string | null;
    email: string | null;
    phoneNumber: string | null;
    establishmentTitle: TEstablishmentTitleEnum;
    educationDepartment: string | null;
    schoolYearName: string;
    termName: string;
    directorName: string | null;
    totalNumberOfStudents: number;
  };
  examNames: string[];
  gradeReport: {
    studentAverage: string | null;
    studentRank: number | null;
    subjects: {
      name: string;
      teacherName: string | null;
      coefficient: number;
      studentAverage: string | null;
      studentRank: number | null;
      teacherObservation: string | null;
      grades: Record<string, string | null>;
    }[];
    studentDiploma: string | null;
  };
  termAverages: {
    termName: string;
    average: string | null;
    rank: number | null;
    diplomaName: string | null;
  }[];
  promotionStatus: TPromotionStatusEnum | null;
};
