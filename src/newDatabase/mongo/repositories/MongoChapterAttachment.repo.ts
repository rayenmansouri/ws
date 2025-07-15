import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import {
  ChapterAttachment,
  ChapterAttachmentMetaData,
  TChapterAttachmentFileTypeEnum,
} from "../../../feature/lms/domain/chapterAttachment.entity";
import { ChapterAttachmentRepo } from "../../../feature/lms/domain/ChapterAttachment.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { Populate } from "../../../core/populateTypes";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { ALLOWED_VIDEO_EXTENSIONS } from "../../../helpers/constants";
import { ID } from "../../../types/BaseEntity";

export class MongoChapterAttachmentRepo
  extends MongoBaseRepo<ChapterAttachmentMetaData>
  implements ChapterAttachmentRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "chapterAttachment", session);
  }

  async list(
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
  > {
    const { search, teacherId, classTypeIds, subjectTypeIds, subSubjectTypeIds, type } = filter;
    const query: FilterQuery<ChapterAttachment> = {};

    if (search) query.name = { $regex: search, $options: "i" };
    if (teacherId) query.teacher = teacherId;
    if (classTypeIds) query.classTypes = { $in: classTypeIds };
    if (subjectTypeIds) query.subjectTypes = { $in: subjectTypeIds };
    if (subSubjectTypeIds) query.subSubjectTypes = { $in: subSubjectTypeIds };
    if (type) query.files = { $elemMatch: { attachmentType: type } };

    const result = await this.findManyWithPagination(query, {
      limit: options.limit,
      page: options.page,
      populate: ["teacher", "classTypes", "subSubjectTypes", "subjectTypes"],
      sort: { createdAt: -1 },
    });
    return result;
  }
  async listChapterDocuments(
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
  > {
    const { search, teacherId, classTypeIds, subjectTypeIds, subSubjectTypeIds } = filter;
    const query: FilterQuery<ChapterAttachment> = {
      "files.mimeType": { $nin: ALLOWED_VIDEO_EXTENSIONS },
    };

    if (search) query.name = { $regex: search, $options: "i" };
    if (teacherId) query.teacher = teacherId;
    if (classTypeIds) query.classTypes = { $in: classTypeIds };
    if (subjectTypeIds) query.subjectTypes = { $in: subjectTypeIds };
    if (subSubjectTypeIds) query.subSubjectTypes = { $in: subSubjectTypeIds };

    const result = await this.findManyWithPagination(query, {
      ...options,
      populate: ["teacher", "classTypes", "subSubjectTypes", "subjectTypes"],
      sort: { createdAt: -1 },
    });
    return result;
  }

  async listChapterVideo(
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
  > {
    const { search, teacherId, classTypeIds, subjectTypeIds, subSubjectTypeIds } = filter;
    const query: FilterQuery<ChapterAttachment> = {
      "files.mimeType": { $in: ALLOWED_VIDEO_EXTENSIONS },
    };

    if (search) query.name = { $regex: search, $options: "i" };
    if (teacherId) query.teacher = teacherId;
    if (classTypeIds) query.classTypes = { $in: classTypeIds };
    if (subjectTypeIds) query.subjectTypes = { $in: subjectTypeIds };
    if (subSubjectTypeIds) query.subSubjectTypes = { $in: subSubjectTypeIds };

    const result = await this.findManyWithPagination(query, {
      ...options,
      populate: ["teacher", "classTypes", "subSubjectTypes", "subjectTypes"],
      sort: { createdAt: -1 },
    });
    return result;
  }
}
