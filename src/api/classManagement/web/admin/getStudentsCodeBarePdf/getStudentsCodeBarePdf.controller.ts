import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetStudentsCodeBarePdfUseCase } from "../../../../../feature/classes/useCases/GetStudentsCodeBarePdf.usecase";
import {
  GetStudentsCodeBarePdfRouteConfig,
  GetStudentsCodeBarePdfResponse,
} from "./getStudentsCodeBarePdf.types";

@Controller()
export class GetStudentsCodeBarePdfController extends BaseController<GetStudentsCodeBarePdfRouteConfig> {
  constructor(
    @inject("GetStudentsCodeBarePdfUseCase")
    private getStudentsCodeBarePdfUseCase: GetStudentsCodeBarePdfUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetStudentsCodeBarePdfRouteConfig>): Promise<void | APIResponse> {
    const { classNewId } = req.params;
    const response = await this.getStudentsCodeBarePdfUseCase.execute({ classNewId });
    return new SuccessResponse<GetStudentsCodeBarePdfResponse>("global.success", response);
  }
}
