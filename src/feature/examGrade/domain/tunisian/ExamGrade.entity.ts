import { GenerateMetaData } from "../../../../core/populateTypes";
import { ID, BaseEntity } from "../../../../types/BaseEntity";
import { OmitFromEnum, PickFromEnum } from "../../../../types/utils/enums.util";
import { Class } from "../../../classes/domain/class.entity";
import { ExamType } from "../../../examTypes/domains/examType.entity";
import { Group } from "../../../groupManagement/domains/group.entity";
import { SubjectType } from "../../../subjectTypes/domains/subjectType.entity";
import { SubSubjectType } from "../../../subSubjectTypes/domains/subSubjectType.entity";
import { Term } from "../../../terms/domains/term.entity";

export const DISPENSED_STATUS = "-";
export type TDispensedStatus = typeof DISPENSED_STATUS;

export const PROMOTION_STATUS_ENUM = {
  PROMOTED: "PROMOTED",
  NOT_PROMOTED: "NOT_PROMOTED",
  EXCEPTIONALLY_PROMOTED: "EXCEPTIONALLY_PROMOTED",
} as const;
export type TPromotionStatusEnum =
  (typeof PROMOTION_STATUS_ENUM)[keyof typeof PROMOTION_STATUS_ENUM];

export type ExamGradeDegrees = Record<ID, number | null | TDispensedStatus>;

export type ExamGrade = {
  topicId: ID;
  term: ID;
  examType: ID;
  degrees: ExamGradeDegrees;
} & BaseEntity &
  (
    | { class: ID; topicType: OmitFromEnum<TTopicTypeEnum, "group"> }
    | { class: null; topicType: PickFromEnum<TTopicTypeEnum, "group"> }
  );

export type ExamGradeMetaData = GenerateMetaData<
  ExamGrade,
  {
    topicId: SubjectType | SubSubjectType | Group;
    term: Term;
    examType: ExamType;
    class: Class;
  }
>;
export const TOPIC_TYPE_ENUM = {
  SUBJECT_TYPE: "subjectType",
  SUB_SUBJECT_TYPE: "subSubjectType",
  GROUP: "group",
  FIELD: "field",
} as const;
export type TTopicTypeEnum = (typeof TOPIC_TYPE_ENUM)[keyof typeof TOPIC_TYPE_ENUM];
