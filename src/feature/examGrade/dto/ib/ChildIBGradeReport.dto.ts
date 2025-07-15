export type ChildIBGradeReportDto = {
  terms: {
    newId: string;
    name: string;
    isLocked: boolean;
  }[];
  selectedTermNewId: string | null;
  studentAverage: string | null;
  diplomaName: string | null;
  subjects:
    | {
        name: string;
        average: string | null;
        exams: {
          name: string;
          grade: string | null;
        }[];
      }[]
    | null;
};
