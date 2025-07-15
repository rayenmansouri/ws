import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateStudentGroupUseCase } from "../../../../../feature/classes/useCases/UpdateStudentGroup.usecase";
import {
  UpdateStudentGroupRouteConfig,
  UpdateStudentGroupResponse,
} from "./updateStudentGroup.types";

@Controller()
export class UpdateStudentGroupController extends BaseController<UpdateStudentGroupRouteConfig> {
  constructor(
    @inject("UpdateStudentGroupUseCase")
    private updateStudentGroupUseCase: UpdateStudentGroupUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateStudentGroupRouteConfig>): Promise<void | APIResponse> {
    const response = await this.updateStudentGroupUseCase.execute({
      classNewId: req.params.classNewId,
      studentNewId: req.params.studentNewId,
      classGroupNewId: req.body.classGroupNewId,
    });
    return new SuccessResponse<UpdateStudentGroupResponse>("global.success", response);
  }
}
