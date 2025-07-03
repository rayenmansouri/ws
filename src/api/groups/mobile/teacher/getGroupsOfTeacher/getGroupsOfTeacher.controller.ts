import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetGroupsOfTeacherUseCase } from "../../../../../feature/groupManagement/useCases/GetGroupsOfTeacher.usecase";
import { Teacher } from "../../../../../feature/teachers/domain/teacher.entity";
import {
  GetGroupsOfTeacherRouteConfig,
  GetGroupsOfTeacherResponse,
} from "./getGroupsOfTeacher.types";

@Controller()
export class GetGroupsOfTeacherController extends BaseController<GetGroupsOfTeacherRouteConfig> {
  constructor(
    @inject("GetGroupsOfTeacherUseCase")
    private getGroupsOfTeacherUseCase: GetGroupsOfTeacherUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetGroupsOfTeacherRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getGroupsOfTeacherUseCase.execute({
      teacher: req.user as unknown as Teacher,
      search: req.query.search,
    });
    return new SuccessResponse<GetGroupsOfTeacherResponse>("global.success", response);
  }
}
