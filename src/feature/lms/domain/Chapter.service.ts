import { ForbiddenError, InternalError } from "../../../core/ApplicationErrors";
import { Populate } from "../../../core/populateTypes";
import { FileUpload } from "../../../helpers/fileUpload";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { ClassTypeService } from "../../classTypes/domains/ClassType.service";
import { ClassType } from "../../classTypes/repo/classType.entity";
import { TOPIC_TYPE_ENUM, TTopicTypeEnum } from "../../examGrade/domain/tunisian/ExamGrade.entity";
import { GroupType } from "../../groupManagement/domains/groupType.entity";
import { SubjectType } from "../../subjectTypes/domains/subjectType.entity";
import { SubSubjectType } from "../../subSubjectTypes/domains/subSubjectType.entity";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { Chapter, ChapterMetaData } from "./chapter.entity";
import { ChapterAttachment, ChapterAttachmentFile } from "./chapterAttachment.entity";

type ChapterGroupedByTopic = {
  topic: SubSubjectType | SubjectType | GroupType;
  topicType: PickFromEnum<TTopicTypeEnum, "subjectType" | "subSubjectType"> | "groupType";
  chapters: Populate<ChapterMetaData, "topic" | "attachments" | "createdBy">[];
};

type PopulateChapter = Populate<ChapterMetaData, "topic" | "attachments" | "createdBy">;

export class ChapterService {
  static groupChaptersByTopic(chapters: PopulateChapter[]): ChapterGroupedByTopic[] {
    const groupedChapter: ChapterGroupedByTopic[] = [];

    chapters.forEach(chapter => {
      const topic = chapter.topic;
      const topicType = chapter.topicType;
      if (!topic) throw new InternalError("Chapter must have a topic or group type");
      const existingGroup = groupedChapter.find(g => g.topic._id === topic._id);

      if (existingGroup) {
        existingGroup.chapters.push(chapter);
      } else {
        groupedChapter.push({ topic, chapters: [chapter], topicType });
      }
    });

    return groupedChapter;
  }

  static countChaptersVideo(
    chapters: { attachments: Pick<ChapterAttachment, "files">[] }[],
  ): number {
    const videoFiles = this.getVideoFiles(chapters);
    return videoFiles.length;
  }

  static countChaptersVideoDurationInSecond(
    chapters: { attachments: Pick<ChapterAttachment, "files">[] }[],
  ): number {
    const videoFiles = this.getVideoFiles(chapters);
    return videoFiles.reduce((total, file) => total + (file.durationInSeconds ?? 0), 0);
  }

  private static getVideoFiles(
    chapters: { attachments: Pick<ChapterAttachment, "files">[] }[],
  ): ChapterAttachmentFile[] {
    const files = chapters.flatMap(chapter =>
      chapter.attachments.flatMap(attachment => attachment.files),
    );

    const videoFiles = files.filter(file => FileUpload.isVideoFile(file.mimeType));
    return videoFiles;
  }

  static countChaptersDocument(
    chapters: { attachments: Pick<ChapterAttachment, "files">[] }[],
  ): number {
    const files = chapters.flatMap(chapter =>
      chapter.attachments.flatMap(attachment => attachment.files),
    );

    const documentFiles = files.filter(file => !FileUpload.isVideoFile(file.mimeType));
    return documentFiles.length;
  }

  static ensureTeacherAccess(
    teacher: Teacher,
    chapter: Pick<Chapter, "createdBy" | "topic" | "topicType">,
    classType: ClassType | undefined,
  ): void {
    const teacherTopic = [...teacher.subjectTypes, ...teacher.groupTypes];
    if (chapter.topicType === TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE && classType && chapter.topic) {
      const subjectTypeId = ClassTypeService.getSubjectTypeIdFromClassTypeBySubSubjectType(
        classType,
        { _id: chapter.topic },
      );
      if (subjectTypeId) teacherTopic.push(subjectTypeId);
    }

    if (chapter.createdBy === teacher._id) return;
    if (teacherTopic.some(topic => topic === chapter.topic)) return;
    throw new ForbiddenError("global.accessDenied");
  }
}
