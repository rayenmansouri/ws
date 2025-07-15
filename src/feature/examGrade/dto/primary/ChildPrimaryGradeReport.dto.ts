export type ChildPrimaryGradeReportDto = {
  terms: {
    newId: string;
    name: string;
    isLocked: boolean;
  }[];
  selectedTermNewId: string | null;
  studentAverage: string | null;
  studentRank: number | null;
  diplomaName: string | null;
  fields:
    | {
        name: string;
        average: string | null;
        subjects: {
          name: string;
          average: string | null;
        }[];
      }[]
    | null;
};
