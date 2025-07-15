import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ReorderSubSubjectInClassTypeUseCase } from "../../../../../feature/classTypes/useCases/ReorderSubSubjectInClassType.usecase";
import {
  ReorderSubSubjectsOfClassTypesRouteConfig,
  ReorderSubSubjectsOfClassTypesResponse,
} from "./reorderSubSubjectsOfClassTypes.types";

@Controller()
export class ReorderSubSubjectsOfClassTypesController extends BaseController<ReorderSubSubjectsOfClassTypesRouteConfig> {
  constructor(
    @inject("ReorderSubSubjectInClassTypeUseCase")
    private reorderSubSubjectInClassTypeUseCase: ReorderSubSubjectInClassTypeUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<ReorderSubSubjectsOfClassTypesRouteConfig>,
  ): Promise<void | APIResponse> {
    await this.reorderSubSubjectInClassTypeUseCase.execute(
      req.params.classTypeNewId,
      req.params.subjectTypeNewId,
      req.body.oldRank,
      req.body.newRank,
    );
    return new SuccessResponse<ReorderSubSubjectsOfClassTypesResponse>(
      "classType.subSubjectsReorderedSuccessfully",
    );
  }
}
