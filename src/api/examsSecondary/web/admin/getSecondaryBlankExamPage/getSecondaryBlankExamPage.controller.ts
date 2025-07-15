import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetSecondaryBlankExamPageUsecase } from "../../../../../feature/examGrade/useCases/secondary/GetSecondaryBlankExamPage.usecase";
import {
  GetSecondaryBlankExamPageRouteConfig,
  GetSecondaryBlankExamPageResponse,
} from "./getSecondaryBlankExamPage.types";

@Controller()
export class GetSecondaryBlankExamPageController extends BaseController<GetSecondaryBlankExamPageRouteConfig> {
  constructor(
    @inject("GetSecondaryBlankExamPageUsecase")
    private getSecondaryBlankExamPageUsecase: GetSecondaryBlankExamPageUsecase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetSecondaryBlankExamPageRouteConfig>): Promise<void | APIResponse> {
    const result = await this.getSecondaryBlankExamPageUsecase.execute({
      classNewId: req.params.classNewId,
      subjectNewId: req.params.subjectNewId,
      subSubjectNewId: req.query.subSubjectNewId,
      termNewId: req.query.termNewId,
    });

    return new SuccessResponse<GetSecondaryBlankExamPageResponse>("global.success", result);
  }
}
