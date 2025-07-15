import {
  TEstablishmentTitleEnum,
  TExamGradeSystemEnum,
} from "../../../levels/domains/level.entity";
import { TGradeReportThemEnum } from "../../../schools/domain/school.entity";

export type PrimaryGradeReportDTO = {
  examGradeSystem: TExamGradeSystemEnum | null;
  templateName: string | null;
  student: {
    _id: string;
    newId: string;
    uniqueId: string | null;
    fullName: string;
    className: string;
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
    gradeReportTheme: TGradeReportThemEnum;
    termName: string;
  };
  gradeReport: {
    totalStudentNumber: number;
    studentAverage: string | null;
    studentRank: number | null;
    lowestAverage: string | null;
    highestAverage: string | null;
    fields: {
      name: string;
      studentAverage: string | null;
      teacherObservation: string | null;
      subjects: {
        name: string;
        studentGrade: string | null;
        highestGrade: string | null;
        lowestGrade: string | null;
        subSubjects: {
          name: string;
          studentGrade: string | null;
          highestGrade: string | null;
          lowestGrade: string | null;
        }[];
      }[];
    }[];
    studentDiploma: string | null;
    studentAnnualAverage: string | null;
  };
};
