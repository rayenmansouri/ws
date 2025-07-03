import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetIBBlankExamPageUsecase } from "../../../../../feature/examGrade/useCases/ib/GetIBBlankExamPage.usecase";
import {
  GetIBBlankExamPageRouteConfig,
  GetIBBlankExamPageResponse,
} from "./getIBBlankExamPage.types";

@Controller()
export class GetIBBlankExamPageController extends BaseController<GetIBBlankExamPageRouteConfig> {
  constructor(
    @inject("GetIBBlankExamPageUsecase")
    private getIBBlankExamPageUsecase: GetIBBlankExamPageUsecase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetIBBlankExamPageRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getIBBlankExamPageUsecase.execute(
      req.params.classNewId,
      req.query.termNewId,
      req.params.subjectNewId,
    );

    return new SuccessResponse<GetIBBlankExamPageResponse>("global.success", response);
  }
}
