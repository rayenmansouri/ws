import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { CHAPTER_ATTACHMENT_FILE_TYPE_ENUM } from "../../../../../feature/lms/domain/chapterAttachment.entity";
import { ListChapterAttachmentsUseCase } from "../../../../../feature/lms/useCases/ListChapterAttachments.usecase";
import { ListChapterVideoResponse, ListChapterVideoRouteConfig } from "./listChapterVideo.types";

@Controller()
export class ListChapterVideoController extends BaseController<ListChapterVideoRouteConfig> {
  constructor(
    @inject("ListChapterAttachmentsUseCase")
    private listChapterAttachmentsUseCase: ListChapterAttachmentsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListChapterVideoRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listChapterAttachmentsUseCase.execute({
      search: req.query.search,
      teacherId: req.userType === END_USER_ENUM.TEACHER ? req.user._id : undefined,
      page: req.query.page,
      limit: req.query.limit,
      classTypeIds: req.query.classTypeIds,
      subSubjectTypeIds: req.query.subSubjectTypeIds,
      subjectTypeIds: req.query.subjectTypeIds,
      type: CHAPTER_ATTACHMENT_FILE_TYPE_ENUM.VIDEO,
    });
    return new SuccessResponse<ListChapterVideoResponse>("global.success", response);
  }
}
