import { ID } from "../../../types/BaseEntity";

export type ClassTypeDto = {
  _id: ID;
  newId: string;
  name: string;
  capacity: number;
  level: { name: string; newId: string };
  subLevel: { name: string; newId: string };
  section: { name: string; newId: string } | null;
  nextClassTypes: { name: string; newId: string }[] | null;
  isTerminal: boolean;
};

export type FieldOfClassTypeDTO = {
  name: string;
  subjects: { name: string; newId: string; _id: string }[];
  coefficient: number;
  rank: number;
};

export type ExamDTO = {
  name: string;
  examTypeNewId: string;
  coefficient: number;
};

export type SubSubjectOfClassTypeDTO = {
  subSubjectType: { name: string; _id: ID; newId: string };
  isIncludedInGradeBook: boolean;
  name: string;
  coefficient: number;
  rank: number;
  exams: ExamDTO[];
};

export type SubjectOfClassTypeDTO = {
  subjectType: { name: string; _id: ID; newId: string };
  rank: number;
  coefficient: number;
  isIncludedInGradeBook: boolean;
  exams: ExamDTO[];
  hasSubSubjects: boolean;
  subSubjects: SubSubjectOfClassTypeDTO[];
};
