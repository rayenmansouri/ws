import { TExamGradeSystemEnum } from "../../../levels/domains/level.entity";

export type IBGradeReportDTO = {
  examGradeSystem: TExamGradeSystemEnum | null;
  student: {
    _id: string;
    newId: string;
    fullName: string;
    className: string;
    classTypeId: string;
  };
  school: {
    _id: string;
    directorName: string | null;
    currentTermName: string;
    schoolYearName: string;
  };
  examNames: string[];
  gradeReport: {
    studentAverage: string | null;
    subjects: {
      name: string;
      teacherName: string | null;
      studentAverage: string | null;
      teacherObservation: string | null;
      investment: string | null;
      grades: Record<string, string | null>;
    }[];
    adminObservation: string | null;
  };
  termNames: string[];
  termAverages: Record<string, string | null>;
  annualAverage: string | null;
  attendanceStats: {
    absent: number;
    late: number;
    expelled: number;
  };
};
