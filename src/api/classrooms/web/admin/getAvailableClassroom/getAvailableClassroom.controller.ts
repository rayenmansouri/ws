import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetAvailableClassroomUseCase } from "../../../../../feature/classrooms/useCases/GetAvailableClassroom.usecase";
import {
  GetAvailableClassroomRouteConfig,
  GetAvailableClassroomResponse,
} from "./getAvailableClassroom.types";

@Controller()
export class GetAvailableClassroomController extends BaseController<GetAvailableClassroomRouteConfig> {
  constructor(
    @inject("GetAvailableClassroomUseCase")
    private getAvailableClassroomUseCase: GetAvailableClassroomUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetAvailableClassroomRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getAvailableClassroomUseCase.execute(req.query);
    return new SuccessResponse<GetAvailableClassroomResponse>("global.success", response);
  }
}
