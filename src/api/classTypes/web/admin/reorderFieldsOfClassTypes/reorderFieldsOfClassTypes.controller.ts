import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ReorderFieldsOfClassTypesUseCase } from "../../../../../feature/classTypes/useCases/ReorderFieldsOfClassType.usecase";
import {
  ReorderFieldsOfClassTypesRouteConfig,
  ReorderFieldsOfClassTypesResponse,
} from "./reorderFieldsOfClassTypes.types";

@Controller()
export class ReorderFieldsOfClassTypesController extends BaseController<ReorderFieldsOfClassTypesRouteConfig> {
  constructor(
    @inject("ReorderFieldsOfClassTypesUseCase")
    private reorderFieldsOfClassTypesUseCase: ReorderFieldsOfClassTypesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ReorderFieldsOfClassTypesRouteConfig>): Promise<void | APIResponse> {
    await this.reorderFieldsOfClassTypesUseCase.execute(
      req.params.classTypeNewId,
      req.body.oldRank,
      req.body.newRank,
    );
    return new SuccessResponse<ReorderFieldsOfClassTypesResponse>(
      "classType.fieldReorderedSuccessfully",
    );
  }
}
