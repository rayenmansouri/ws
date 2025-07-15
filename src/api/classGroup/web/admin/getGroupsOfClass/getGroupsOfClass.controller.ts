import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetGroupsOfClassUseCase } from "../../../../../feature/classes/useCases/GetGroupsOfClass.usecase";
import { GetGroupsOfClassResponse, GetGroupsOfClassRouteConfig } from "./getGroupsOfClass.types";

@Controller()
export class GetGroupsOfClassController extends BaseController<GetGroupsOfClassRouteConfig> {
  constructor(
    @inject("GetGroupsOfClassUseCase")
    private getGroupsOfClassUseCase: GetGroupsOfClassUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetGroupsOfClassRouteConfig>): Promise<void | APIResponse> {
    const { classNewId } = req.params;

    const groups = await this.getGroupsOfClassUseCase.execute(classNewId);

    return new SuccessResponse<GetGroupsOfClassResponse>("global.success", groups);
  }
}
