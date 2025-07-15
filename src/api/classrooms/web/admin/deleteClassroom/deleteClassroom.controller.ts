import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteClassroomUseCase } from "../../../../../feature/classrooms/useCases/DeleteClassroom.usecase";
import { DeleteClassroomRouteConfig, DeleteClassroomResponse } from "./deleteClassroom.types";

@Controller()
export class DeleteClassroomController extends BaseController<DeleteClassroomRouteConfig> {
  constructor(
    @inject("DeleteClassroomUseCase") private deleteClassroomUseCase: DeleteClassroomUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteClassroomRouteConfig>): Promise<void | APIResponse> {
    await this.deleteClassroomUseCase.execute(req.params.classroomNewId);
    return new SuccessResponse<DeleteClassroomResponse>("global.success");
  }
}
