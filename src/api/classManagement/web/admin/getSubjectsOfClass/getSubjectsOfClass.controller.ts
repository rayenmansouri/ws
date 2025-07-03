import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetSubjectsOfClassUseCase } from "../../../../../feature/classes/useCases/GetSubjectsOfClass.usecase";
import {
  GetSubjectsOfClassRouteConfig,
  GetSubjectsOfClassResponse,
} from "./getSubjectsOfClass.types";

@Controller()
export class GetSubjectsOfClassController extends BaseController<GetSubjectsOfClassRouteConfig> {
  constructor(
    @inject("GetSubjectsOfClassUseCase")
    private getSubjectsOfClassUseCase: GetSubjectsOfClassUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetSubjectsOfClassRouteConfig>): Promise<void | APIResponse> {
    const { classNewId } = req.params;
    const subjectsOfClass = await this.getSubjectsOfClassUseCase.execute({
      classNewId,
    });
    return new SuccessResponse<GetSubjectsOfClassResponse>("global.success", subjectsOfClass);
  }
}
