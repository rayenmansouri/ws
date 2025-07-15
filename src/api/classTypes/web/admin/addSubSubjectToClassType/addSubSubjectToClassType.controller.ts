import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddSubSubjectToClassTypeUseCase } from "../../../../../feature/classTypes/useCases/AddSubSubjectToClassType.usecase";
import {
  AddSubSubjectToClassTypeRouteConfig,
  AddSubSubjectToClassTypeResponse,
} from "./addSubSubjectToClassType.types";

@Controller()
export class AddSubSubjectToClassTypeController extends BaseController<AddSubSubjectToClassTypeRouteConfig> {
  constructor(
    @inject("AddSubSubjectToClassTypeUseCase")
    private addSubSubjectToClassTypeUseCase: AddSubSubjectToClassTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddSubSubjectToClassTypeRouteConfig>): Promise<void | APIResponse> {
    await this.addSubSubjectToClassTypeUseCase.execute(
      req.params.classTypeNewId,
      req.params.subjectTypeNewId,
      req.body,
    );
    return new SuccessResponse<AddSubSubjectToClassTypeResponse>("global.success");
  }
}
