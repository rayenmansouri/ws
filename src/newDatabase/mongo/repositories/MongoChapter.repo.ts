import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Populate } from "../../../core/populateTypes";
import { Chapter, ChapterMetaData } from "../../../feature/lms/domain/chapter.entity";
import { ChapterRepo } from "../../../feature/lms/domain/Chapter.repo";
import { ChapterAttachmentMetaData } from "../../../feature/lms/domain/chapterAttachment.entity";
import { ID } from "../../../types/BaseEntity";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoChapterRepo extends MongoBaseRepo<ChapterMetaData> implements ChapterRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "chapter", session);
  }

  async removeChapterAttachments(chapterAttachmentIds: ID[]): Promise<void> {
    const query: FilterQuery<Chapter> = { attachments: { $in: chapterAttachmentIds } };
    await this.model.updateMany(query, {
      $pull: { attachments: { $in: chapterAttachmentIds } },
    });
  }
  getChapterByAttachmentId(attachmentIds: ID[]): Promise<Chapter[]> {
    const query: FilterQuery<Chapter> = { attachments: { $in: attachmentIds } };
    return this.model.find(query);
  }

  async getStudentChapters(data: {
    classTypeId: ID | undefined;
    groupTypeIds: ID[] | undefined;
  }): Promise<Populate<ChapterMetaData, "attachments" | "topic" | "createdBy">[]> {
    const { classTypeId, groupTypeIds } = data;

    const query: FilterQuery<Chapter> = {
      $or: [],
    };
    if (classTypeId) query.$or?.push({ classType: classTypeId });

    if (groupTypeIds && groupTypeIds.length > 0) query.$or?.push({ topic: { $in: groupTypeIds } });

    return this.model.find(query).populate({
      path: "attachments topic createdBy",
    });
  }

  async getChaptersByTopic(
    topicType: "subjectType" | "subSubjectType" | "groupType",
    topicId: ID,
    classTypeId?: ID,
  ): Promise<
    (Omit<Chapter, "attachments"> & {
      attachments: Populate<ChapterAttachmentMetaData, "teacher">[];
    })[]
  > {
    const query: FilterQuery<Chapter> = {
      topicType,
      topic: topicId,
    };
    if (classTypeId) query.classType = classTypeId;

    return (await this.model.find(query).populate({
      path: "attachments",
      populate: { path: "teacher" },
    })) as never; // NEED to find a better way to type this
  }
}
