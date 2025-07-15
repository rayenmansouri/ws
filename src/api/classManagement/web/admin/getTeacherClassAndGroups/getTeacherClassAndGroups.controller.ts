import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetTeacherClassAndGroupsUseCase } from "../../../../../feature/classes/useCases/GetTeacherClassAndGroups.usecase";
import {
  GetTeacherClassAndGroupsRouteConfig,
  GetTeacherClassAndGroupsResponse,
} from "./getTeacherClassAndGroups.types";

@Controller()
export class GetTeacherClassAndGroupsController extends BaseController<GetTeacherClassAndGroupsRouteConfig> {
  constructor(
    @inject("GetTeacherClassAndGroupsUseCase")
    private getTeacherClassAndGroupsUseCase: GetTeacherClassAndGroupsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetTeacherClassAndGroupsRouteConfig>): Promise<void | APIResponse> {
    const { teacherNewId } = req.params;
    const result = await this.getTeacherClassAndGroupsUseCase.execute({ teacherNewId });
    return new SuccessResponse<GetTeacherClassAndGroupsResponse>("global.success", result);
  }
}
