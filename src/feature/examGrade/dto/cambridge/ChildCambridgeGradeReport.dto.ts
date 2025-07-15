export type ChildCambridgeGradeReportDto = {
  terms: {
    newId: string;
    name: string;
    isLocked: boolean;
  }[];
  selectedTermNewId: string | null;
  studentAverage: string | null;
  studentRank: number | null;
  diplomaName: string | null;
  subjects:
    | {
        name: string;
        average: string | null;
        gradeLetter: string | null;
        exams: {
          name: string;
          grade: string | null;
          gradeLetter: string | null;
        }[];
      }[]
    | null;
};
