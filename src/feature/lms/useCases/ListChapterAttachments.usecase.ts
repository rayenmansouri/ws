import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ChapterAttachmentRepo } from "../domain/ChapterAttachment.repo";
import { ListOptions } from "../../../types/types";
import { ID } from "../../../types/BaseEntity";
import { applyMapperToPaginatedResponse } from "../../../helpers/applyMapperToPaginatedResponse";
import { ChapterAttachmentMapper } from "../mappers/ChapterAttachment.mapper";
import { TChapterAttachmentFileTypeEnum } from "../domain/chapterAttachment.entity";
import { ChapterAttachmentDto } from "../dtos/ChapterAttachment.dto";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";

type ListChapterAttachmentsUseCaseDto = {
  search?: string;
  classTypeIds?: ID[];
  subjectTypeIds?: ID[];
  subSubjectTypeIds?: ID[];
  type?: TChapterAttachmentFileTypeEnum;
  teacherId?: ID;
} & ListOptions;

@injectable()
export class ListChapterAttachmentsUseCase {
  constructor(
    @inject("ChapterAttachmentRepo") private chapterAttachmentRepo: ChapterAttachmentRepo,
  ) {}

  async execute(
    dto: ListChapterAttachmentsUseCaseDto,
  ): Promise<ResponseWithPagination<ChapterAttachmentDto>> {
    const {
      search,
      classTypeIds,
      subjectTypeIds,
      subSubjectTypeIds,
      page,
      limit,
      type,
      teacherId,
    } = dto;

    const response = await this.chapterAttachmentRepo.list(
      { search, classTypeIds, subjectTypeIds, subSubjectTypeIds, type, teacherId },
      { limit, page },
    );

    const responseDtos = applyMapperToPaginatedResponse(
      response,
      ChapterAttachmentMapper.toChapterAttachmentDto,
    );
    return responseDtos;
  }
}
