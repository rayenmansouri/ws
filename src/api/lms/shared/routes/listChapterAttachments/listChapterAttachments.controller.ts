import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListChapterAttachmentsUseCase } from "../../../../../feature/lms/useCases/ListChapterAttachments.usecase";
import {
  ListChapterAttachmentsRouteConfig,
  ListChapterAttachmentsResponse,
} from "./listChapterAttachments.types";

@Controller()
export class ListChapterAttachmentsController extends BaseController<ListChapterAttachmentsRouteConfig> {
  constructor(
    @inject("ListChapterAttachmentsUseCase")
    private listChapterAttachmentsUseCase: ListChapterAttachmentsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListChapterAttachmentsRouteConfig>): Promise<void | APIResponse> {
    const { search, classTypeIds, subjectTypeIds, subSubjectTypeIds } = req.query;
    const { page, limit } = req.query;
    const response = await this.listChapterAttachmentsUseCase.execute({
      search,
      classTypeIds,
      subjectTypeIds,
      subSubjectTypeIds,
      teacherId: req.userType === END_USER_ENUM.TEACHER ? req.user._id : undefined,
      page,
      limit,
    });
    return new SuccessResponse<ListChapterAttachmentsResponse>("global.success", response);
  }
}
