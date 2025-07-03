import { TEndAdministrationUserEnums } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddChapterUseCase } from "../../../../../feature/lms/useCases/AddChapter.usecase";
import { AddChapterRouteConfig, AddChapterResponse } from "./addChapter.types";

@Controller()
export class AddChapterController extends BaseController<AddChapterRouteConfig> {
  constructor(@inject("AddChapterUseCase") private addChapterUseCase: AddChapterUseCase) {
    super();
  }

  async main(req: TypedRequest<AddChapterRouteConfig>): Promise<void | APIResponse> {
    const response = await this.addChapterUseCase.execute({
      ...req.body,
      userId: req.user._id,
      userType: req.userType as TEndAdministrationUserEnums,
      classTypeNewId: req.body.classTypeNewId || null,
    });
    return new SuccessResponse<AddChapterResponse>("global.success", response);
  }
}
