import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddSessionForGroupUseCase } from "../../../../../feature/sessionManagement/useCases/AddSessionForGroup.usecase";
import {
  AddSessionForGroupRouteConfig,
  AddSessionForGroupResponse,
} from "./addSessionForGroup.types";

@Controller()
export class AddSessionForGroupController extends BaseController<AddSessionForGroupRouteConfig> {
  constructor(
    @inject("AddSessionForGroupUseCase")
    private addSessionForGroupUseCase: AddSessionForGroupUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddSessionForGroupRouteConfig>): Promise<void | APIResponse> {
    const response = await this.addSessionForGroupUseCase.execute({
      sessionTypeNewId: req.body.sessionTypeNewId,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      groupNewId: req.body.groupNewId,
      classroomNewId: req.body.classroomNewId,
    });
    return new SuccessResponse<AddSessionForGroupResponse>("global.success", response);
  }
}
