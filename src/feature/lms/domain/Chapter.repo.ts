import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ID } from "../../../types/BaseEntity";
import { Chapter, ChapterMetaData } from "./chapter.entity";
import { ChapterAttachmentMetaData } from "./chapterAttachment.entity";

export abstract class ChapterRepo extends BaseRepo<ChapterMetaData> {
  //TODO need to change the name of this method
  abstract getStudentChapters(data: {
    classTypeId: ID | undefined;
    groupTypeIds: ID[] | undefined;
  }): Promise<Populate<ChapterMetaData, "attachments" | "topic" | "createdBy">[]>;
  abstract getChaptersByTopic(
    topicType: "subjectType" | "subSubjectType" | "groupType",
    topicId: ID,
    classTypeId?: ID,
  ): Promise<
    (Omit<Chapter, "attachments"> & {
      attachments: Populate<ChapterAttachmentMetaData, "teacher">[];
    })[]
  >;

  abstract removeChapterAttachments(chapterAttachmentIds: ID[]): Promise<void>;

  abstract getChapterByAttachmentId(attachmentIds: ID[]): Promise<Chapter[]>;
}
