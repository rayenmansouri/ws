import { TEndAdministrationUserEnums } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateChapterUseCase } from "../../../../../feature/lms/useCases/UpdateChapter.usecase";
import { UpdateChapterRouteConfig, UpdateChapterResponse } from "./updateChapter.types";

@Controller()
export class UpdateChapterController extends BaseController<UpdateChapterRouteConfig> {
  constructor(@inject("UpdateChapterUseCase") private updateChapterUseCase: UpdateChapterUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateChapterRouteConfig>): Promise<void | APIResponse> {
    const response = await this.updateChapterUseCase.execute({
      ...req.body,
      chapterAttachmentFileNewIds: req.body.chapterAttachmentNewIds,
      userId: req.user._id,
      userType: req.userType as TEndAdministrationUserEnums,
      chapterNewId: req.params.chapterNewId,
    });
    return new SuccessResponse<UpdateChapterResponse>("global.success", response);
  }
}
