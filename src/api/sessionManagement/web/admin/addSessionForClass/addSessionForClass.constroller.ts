import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  AddSessionForClassDtoRequest,
  AddSessionForClassUseCase,
} from "../../../../../feature/sessionManagement/useCases/AddSessionForClass.usecase";
import {
  AddSessionForClassRouteConfig,
  AddSessionForClassResponse,
} from "./addSessionForClass.types";

@Controller()
export class AddSessionForClassController extends BaseController<AddSessionForClassRouteConfig> {
  constructor(
    @inject("AddSessionForClassUseCase")
    private addSessionForClassUseCase: AddSessionForClassUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddSessionForClassRouteConfig>): Promise<void | APIResponse> {
    const data: AddSessionForClassDtoRequest = {
      ...req.body,
    };
    const response = await this.addSessionForClassUseCase.execute(data);
    return new SuccessResponse<AddSessionForClassResponse>("global.success", response);
  }
}
