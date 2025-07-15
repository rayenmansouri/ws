import { TGradeReportThemEnum } from "../../../schools/domain/school.entity";
import { TPromotionStatusEnum } from "../../domain/tunisian/ExamGrade.entity";

export type PrimaryAnnualGradeReportDTO = {
  information: {
    schoolId: string;
    schoolName: string;
    schoolYearName: string;
    educationDepartment: string;
    address: string | null;
    phoneNumber: string | null;
    email: string | null;
    className: string;
    numberOfStudents: number;
    directorName: string | null;
  };
  student: {
    name: string;
    uniqueId: string | null;
    termNames: string[];
    termAverages: Record<string, string | null>;
    annualAverage: string | null;
    highestAnnualAverage: string | null;
    lowestAnnualAverage: string | null;
    promotionStatus: TPromotionStatusEnum;
  };
  teacherNames: string[];
  gradeReportTheme: TGradeReportThemEnum;
};
