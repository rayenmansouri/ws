import { ID } from "../../../types/BaseEntity";

export type ClassTypeDto = {
  _id: ID;
  newId: string;
  name: string;
  capacity: number;
  level: { name: string; newId: string };
  subLevel: { name: string; newId: string };
  nextClassTypes: { name: string; newId: string }[] | null;
  isTerminal: boolean;
};

export type FieldOfClassTypeDTO = {
  name: string;
  subjects: { name: string; newId: string; _id: string }[];
  coefficient: number;
  rank: number;
};

export type SubSubjectOfClassTypeDTO = {
  subSubjectType: { name: string; _id: ID; newId: string };
  name: string;
  coefficient: number;
  rank: number;
};

export type SubjectOfClassTypeDTO = {
  subjectType: { name: string; _id: ID; newId: string };
  rank: number;
  coefficient: number;
  hasSubSubjects: boolean;
  subSubjects: SubSubjectOfClassTypeDTO[];
};
