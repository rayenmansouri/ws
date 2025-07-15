import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import {
  ChapterAttachment,
  ChapterAttachmentMetaData,
  TChapterAttachmentFileTypeEnum,
} from "./chapterAttachment.entity";

export abstract class ChapterAttachmentRepo extends BaseRepo<ChapterAttachmentMetaData> {
  abstract listChapterDocuments(
    filter: {
      search?: string;
      teacherId?: string;
      classTypeIds?: ID[];
      subjectTypeIds?: ID[];
      subSubjectTypeIds?: ID[];
    },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<
      Populate<
        ChapterAttachmentMetaData,
        "teacher" | "classTypes" | "subjectTypes" | "subSubjectTypes"
      >
    >
  >;
  abstract listChapterVideo(
    filter: {
      search?: string;
      teacherId?: string;
      classTypeIds?: ID[];
      subjectTypeIds?: ID[];
      subSubjectTypeIds?: ID[];
    },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<
      Populate<
        ChapterAttachmentMetaData,
        "teacher" | "classTypes" | "subjectTypes" | "subSubjectTypes"
      >
    >
  >;

  abstract list(
    filter: {
      search?: string;
      teacherId?: string;
      classTypeIds?: ID[];
      subjectTypeIds?: ID[];
      subSubjectTypeIds?: ID[];
      type?: TChapterAttachmentFileTypeEnum;
    },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<
      Populate<
        ChapterAttachmentMetaData,
        "teacher" | "classTypes" | "subjectTypes" | "subSubjectTypes"
      >
    >
  >;
}
