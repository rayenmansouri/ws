import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetCambridgeBlankExamPageUsecase } from "../../../../../feature/examGrade/useCases/cambridge/GetCambridgeBlankExamPage.usecase";
import {
  GetCambridgeBlankExamPageRouteConfig,
  GetCambridgeBlankExamPageResponse,
} from "./getCambridgeBlankExamPage.types";

@Controller()
export class GetCambridgeBlankExamPageController extends BaseController<GetCambridgeBlankExamPageRouteConfig> {
  constructor(
    @inject("GetCambridgeBlankExamPageUsecase")
    private getCambridgeBlankExamPageUsecase: GetCambridgeBlankExamPageUsecase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetCambridgeBlankExamPageRouteConfig>): Promise<void | APIResponse> {
    const result = await this.getCambridgeBlankExamPageUsecase.execute(
      req.params.classNewId,
      req.query.termNewId,
      req.params.subjectNewId,
    );

    return new SuccessResponse<GetCambridgeBlankExamPageResponse>("global.success", result);
  }
}
