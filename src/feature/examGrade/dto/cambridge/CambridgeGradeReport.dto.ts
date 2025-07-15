import { TExamGradeSystemEnum } from "../../../levels/domains/level.entity";

export type CambridgeGradeReportDTO = {
  examGradeSystem: TExamGradeSystemEnum | null;
  student: {
    _id: string;
    newId: string;
    fullName: string;
    className: string;
    birthDate: Date | null;
  };
  school: {
    _id: string;
    name: string;
    address: string | null;
    email: string | null;
    phoneNumber: string | null;
    educationDepartment: string | null;
    currentTermName: string;
    schoolYearName: string;
  };
  examNames: string[];
  gradeReport: {
    studentAverage: string | null;
    studentAverageEquivalence: string | null;
    studentLetterGrade: string | null;
    studentRank: number | null;
    subjects: {
      name: string;
      teacherName: string | null;
      studentAverage: string | null;
      studentAverageEquivalence: string | null;
      studentLetterGrade: string | null;
      studentRank: number | null;
      teacherObservation: string | null;
      grades: Record<string, string | null>;
    }[];
    studentDiploma: string | null;
  };
  letterGradeIntervals: { letter: string; interval: string }[];
};
