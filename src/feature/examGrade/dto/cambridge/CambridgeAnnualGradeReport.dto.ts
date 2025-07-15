export type CambridgeAnnualGradeReportDTO = {
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
    schoolYearName: string;
  };
  termNames: string[];
  subjectGrades: {
    name: string;
    termGrades: Record<string, string | null>;
    annualGrade: string | null;
    annualGradeLetter: string | null;
  }[];
  adminObservation: string | null;
};
