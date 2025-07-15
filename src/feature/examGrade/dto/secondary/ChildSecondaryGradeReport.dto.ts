export type ChildSecondaryGradeReportDto = {
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
        hasSubSubjects: boolean;
        exams: {
          name: string;
          grade: string | null;
        }[];
        subSubjects: {
          name: string;
          exams: {
            name: string;
            grade: string | null;
          }[];
        }[];
      }[]
    | null;
};
