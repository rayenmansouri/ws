import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ReorderSubjectInClassTypeUseCase } from "../../../../../feature/classTypes/useCases/ReorderSubjectInClassType.usecase";
import {
  ReorderSubjectsOfClassTypesRouteConfig,
  ReorderSubjectsOfClassTypesResponse,
} from "./reorderSubjectsOfClassTypes.types";

@Controller()
export class ReorderSubjectsOfClassTypesController extends BaseController<ReorderSubjectsOfClassTypesRouteConfig> {
  constructor(
    @inject("ReorderSubjectInClassTypeUseCase")
    private reorderSubjectInClassTypeUseCase: ReorderSubjectInClassTypeUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<ReorderSubjectsOfClassTypesRouteConfig>,
  ): Promise<void | APIResponse> {
    const { classTypeNewId } = req.params;
    const { oldRank, newRank } = req.body;
    await this.reorderSubjectInClassTypeUseCase.execute(classTypeNewId, oldRank, newRank);
    return new SuccessResponse<ReorderSubjectsOfClassTypesResponse>(
      "classType.subjectsReorderedSuccessfully",
    );
  }
}
