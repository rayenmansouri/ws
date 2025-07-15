import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddFieldToClasstypeUseCase } from "../../../../../feature/classTypes/useCases/AddFieldToClasstype.usecase";
import {
  AddFieldToClassTypeRouteConfig,
  AddFieldToClassTypeResponse,
} from "./addFieldToClassType.types";

@Controller()
export class AddFieldToClassTypeController extends BaseController<AddFieldToClassTypeRouteConfig> {
  constructor(
    @inject("AddFieldToClasstypeUseCase")
    private addFieldToClasstypeUseCase: AddFieldToClasstypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddFieldToClassTypeRouteConfig>): Promise<void | APIResponse> {
    await this.addFieldToClasstypeUseCase.execute(req.params.classTypeNewId, req.body);

    return new SuccessResponse<AddFieldToClassTypeResponse>("classType.fieldAddedSuccessfully");
  }
}
