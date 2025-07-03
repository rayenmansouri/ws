import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetPrimaryBlankExamPageRouteConfig,
  GetPrimaryBlankExamPageResponse,
} from "./getPrimaryBlankExamPage.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { GetPrimaryBlankExamPageUsecase } from "../../../../../feature/examGrade/useCases/primary/GetPrimaryBlankExamPage.usecase";

@Controller()
export class GetPrimaryBlankExamPageController extends BaseController<GetPrimaryBlankExamPageRouteConfig> {
  constructor(
    @inject("GetPrimaryBlankExamPageUsecase")
    private getPrimaryBlankExamPageUsecase: GetPrimaryBlankExamPageUsecase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetPrimaryBlankExamPageRouteConfig>): Promise<void | APIResponse> {
    const result = await this.getPrimaryBlankExamPageUsecase.execute(
      req.params.classNewId,
      req.query.termNewId,
      +req.params.fieldIndex,
    );

    return new SuccessResponse<GetPrimaryBlankExamPageResponse>("global.success", result);
  }
}
