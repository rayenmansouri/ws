import { TEndAdministrationUserEnums } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteChapterAttachmentUseCase } from "../../../../../feature/lms/useCases/DeleteChapterAttachment.usecase";
import {
  DeleteChapterAttachmentRouteConfig,
  DeleteChapterAttachmentResponse,
} from "./deleteChapterAttachment.types";

@Controller()
export class DeleteChapterAttachmentController extends BaseController<DeleteChapterAttachmentRouteConfig> {
  constructor(
    @inject("DeleteChapterAttachmentUseCase")
    private deleteChapterAttachmentUseCase: DeleteChapterAttachmentUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteChapterAttachmentRouteConfig>): Promise<void | APIResponse> {
    const { chapterAttachmentNewId } = req.params;
    const response = await this.deleteChapterAttachmentUseCase.execute({
      chapterAttachmentNewId,
      userType: req.userType as TEndAdministrationUserEnums,
      userId: req.user._id,
    });
    return new SuccessResponse<DeleteChapterAttachmentResponse>("global.success", response);
  }
}
