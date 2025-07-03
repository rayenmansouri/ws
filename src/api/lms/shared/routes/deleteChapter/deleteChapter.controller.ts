import { TEndAdministrationUserEnums } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteChapterUseCase } from "../../../../../feature/lms/useCases/DeleteChapter.usecase";
import { DeleteChapterRouteConfig, DeleteChapterResponse } from "./deleteChapter.types";

@Controller()
export class DeleteChapterController extends BaseController<DeleteChapterRouteConfig> {
  constructor(@inject("DeleteChapterUseCase") private deleteChapterUseCase: DeleteChapterUseCase) {
    super();
  }

  async main(req: TypedRequest<DeleteChapterRouteConfig>): Promise<void | APIResponse> {
    const response = await this.deleteChapterUseCase.execute({
      chapterNewId: req.params.chapterNewId,
      user: req.user,
      userType: req.userType as TEndAdministrationUserEnums,
    });
    return new SuccessResponse<DeleteChapterResponse>("global.success", response);
  }
}
