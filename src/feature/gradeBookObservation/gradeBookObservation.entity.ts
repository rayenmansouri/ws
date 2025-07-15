import { GenerateMetaData } from "../../core/populateTypes";
import { BaseEntity, ID } from "../../types/BaseEntity";
import { Class } from "../classes/domain/class.entity";
import { TTopicTypeEnum } from "../examGrade/domain/tunisian/ExamGrade.entity";
import { Group } from "../groupManagement/domains/group.entity";
import { SubjectType } from "../subjectTypes/domains/subjectType.entity";
import { SubSubjectType } from "../subSubjectTypes/domains/subSubjectType.entity";
import { Term } from "../terms/domains/term.entity";

export type GradeBookObservation = {
  topicId: ID | null;
  topicType: TTopicTypeEnum | null;
  class: ID | null;
  term: ID;
  observations: Record<ID, string | null | undefined>;
  ibInvestments: Record<ID, string | null | undefined>;
} & BaseEntity;

export type GradeBookObservationMetaData = GenerateMetaData<
  GradeBookObservation,
  { topicId: SubjectType | SubSubjectType | Group; class: Class; term: Term }
>;
