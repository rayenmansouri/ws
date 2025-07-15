import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { CHAPTER_ATTACHMENT_FILE_TYPE_ENUM } from "../../../../../feature/lms/domain/chapterAttachment.entity";
import { ListChapterAttachmentsUseCase } from "../../../../../feature/lms/useCases/ListChapterAttachments.usecase";
import {
  ListChapterDocumentsResponse,
  ListChapterDocumentsRouteConfig,
} from "./listChapterDocuments.types";

@Controller()
export class ListChapterDocumentsController extends BaseController<ListChapterDocumentsRouteConfig> {
  constructor(
    @inject("ListChapterAttachmentsUseCase")
    private listChapterAttachmentsUseCase: ListChapterAttachmentsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListChapterDocumentsRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listChapterAttachmentsUseCase.execute({
      search: req.query.search,
      limit: req.query.limit,
      page: req.query.page,
      teacherId: req.userType === END_USER_ENUM.TEACHER ? req.user._id : undefined,
      classTypeIds: req.query.classTypeIds,
      subjectTypeIds: req.query.subjectTypeIds,
      subSubjectTypeIds: req.query.subSubjectTypeIds,
      type: CHAPTER_ATTACHMENT_FILE_TYPE_ENUM.DOCUMENT,
    });
    return new SuccessResponse<ListChapterDocumentsResponse>("global.success", response);
  }
}
