import { Populate } from "../../../core/populateTypes";
import { Chapter } from "../domain/chapter.entity";
import { ChapterService } from "../domain/Chapter.service";
import { ChapterAttachmentMetaData } from "../domain/chapterAttachment.entity";
import { ChapterDetailsDto, topicChapterDto } from "../dtos/Chapter.dto";
import { ChapterAttachmentMapper } from "./ChapterAttachment.mapper";

export class ChapterMapper {
  static toTopicChapterDto(
    data: ReturnType<typeof ChapterService.groupChaptersByTopic>[number],
  ): topicChapterDto {
    return {
      topic: {
        _id: data.topic._id,
        newId: data.topic.newId,
        name: data.topic.name,
        type: data.topicType,
      },
      videoNumber: ChapterService.countChaptersVideo(data.chapters),
      filesNumber: ChapterService.countChaptersDocument(data.chapters),
      illustration: data.topic.illustration,
    };
  }

  static toChapterDetailsDto(
    chapter: Pick<Chapter, "name" | "description" | "_id" | "newId"> & {
      attachments: Populate<ChapterAttachmentMetaData, "teacher">[];
    },
  ): ChapterDetailsDto {
    return {
      _id: chapter._id,
      newId: chapter.newId,
      name: chapter.name,
      description: chapter.description,
      attachments: chapter.attachments.map(ChapterAttachmentMapper.toChapterAttachmentDetailsDto),
      videoNumber: ChapterService.countChaptersVideo([chapter]),
      filesNumber: ChapterService.countChaptersDocument([chapter]),
      totalDurationInSeconds: ChapterService.countChaptersVideoDurationInSecond([chapter]),
    };
  }
}
