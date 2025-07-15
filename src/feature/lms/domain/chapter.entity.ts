import { TEndAdministrationUserEnums } from "../../../constants/globalEnums";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { Admin } from "../../admins/domain/admin.entity";
import { ClassType } from "../../classTypes/repo/classType.entity";
import { TTopicTypeEnum } from "../../examGrade/domain/tunisian/ExamGrade.entity";
import { GroupType } from "../../groupManagement/domains/groupType.entity";
import { SubjectType } from "../../subjectTypes/domains/subjectType.entity";
import { SubSubjectType } from "../../subSubjectTypes/domains/subSubjectType.entity";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { ChapterAttachment } from "./chapterAttachment.entity";

export type Chapter = {
  name: string;
  description: string | null;
  classType: ID | null;
  topic: ID | null;
  topicType: PickFromEnum<TTopicTypeEnum, "subjectType" | "subSubjectType"> | "groupType";
  attachments: ID[];
  createdBy: ID;
  userType: TEndAdministrationUserEnums;
} & BaseEntity;

export type ChapterMetaData = GenerateMetaData<
  Chapter,
  {
    classType: ClassType;
    topic: SubjectType | SubSubjectType | GroupType;
    attachments: ChapterAttachment[];
    createdBy: Teacher | Admin;
  }
>;
