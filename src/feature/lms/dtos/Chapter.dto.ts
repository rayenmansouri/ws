import { ID } from "../../../types/BaseEntity";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { TTopicTypeEnum } from "../../examGrade/domain/tunisian/ExamGrade.entity";
import { ChapterAttachmentDetailsDto } from "./ChapterAttachment.dto";

export type topicChapterDto = {
  videoNumber: number;
  filesNumber: number;
  topic: {
    type: PickFromEnum<TTopicTypeEnum, "subjectType" | "subSubjectType"> | "groupType";
    _id: ID;
    newId: string;
    name: string;
  };
  illustration: string;
};

export type ChapterDetailsDto = {
  name: string;
  _id: ID;
  newId: string;
  description: string | null;
  attachments: ChapterAttachmentDetailsDto[];
  videoNumber: number;
  filesNumber: number;
  totalDurationInSeconds: number;
};
