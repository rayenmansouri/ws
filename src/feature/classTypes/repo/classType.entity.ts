import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { ExamType } from "../../examTypes/domains/examType.entity";
import { Section } from "../../sections/domain/section.entity";
import { SessionType } from "../../sessionTypes/domains/sessionType.entity";
import { SubjectType } from "../../subjectTypes/domains/subjectType.entity";
import { SubLevel } from "../../subLevels/domains/subLevel.entity";
import { SubSubjectType } from "../../subSubjectTypes/domains/subSubjectType.entity";

export type SubSubjectOfClassType = {
  subSubjectType: ID;
  coefficient: number;
  exams: { examType: ID; coefficient: number }[];
};

export type SubjectOfClassType = {
  subjectType: ID;
  subSubjects: SubSubjectOfClassType[];
  coefficient: number;
  exams: { examType: ID; coefficient: number }[];
};

export type TActivityOfClassType = {
  durationInMinutes: number;
  sessionType: ID;
  week: "A" | "B" | null;
  perGroup: boolean;
  subjectType: ID;
  subSubjectType: ID | null;
};

export type ClassType = (
  | { nextClassTypes: ID[]; isTerminal: false }
  | { nextClassTypes: null; isTerminal: true }
) & {
  name: string;
  subLevel: ID;
  section: ID | null;
  subjects: SubjectOfClassType[];
  fields: { _id: ID; name: string; subjects: ID[]; coefficient: number }[];
  capacity: number;
  activities: TActivityOfClassType[];
  maxGapsPerWeekInMinutes: number | null;
} & BaseEntity;

export type ClassTypeMetaData = GenerateMetaData<
  ClassType,
  {
    subLevel: SubLevel;
    section: Section;
    nextClassTypes: ClassType[];
    "fields.subjects": SubjectType[];
    "subjects.exams.examType": ExamType;
    "subjects.subSubjects.exams.examType": ExamType;
    "subjects.subSubjects.subSubjectType": SubSubjectType;
    "subjects.subjectType": SubjectType;
    "activities.sessionType": SessionType;
    "activities.subjectType": SubjectType;
    "activities.subSubjectType": SubSubjectType;
  }
>;
