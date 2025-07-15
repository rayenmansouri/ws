import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddSubjectToClassTypeUseCase } from "../../../../../feature/classTypes/useCases/AddSubjectToClassType.usecase";
import {
  AddSubjectToClassTypeRouteConfig,
  AddSubjectToClassTypeResponse,
} from "./addSubjectToClassType.types";

@Controller()
export class AddSubjectToClassTypeController extends BaseController<AddSubjectToClassTypeRouteConfig> {
  constructor(
    @inject("AddSubjectToClassTypeUseCase")
    private addSubjectToClassTypeUseCase: AddSubjectToClassTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddSubjectToClassTypeRouteConfig>): Promise<void | APIResponse> {
    await this.addSubjectToClassTypeUseCase.execute(req.params.classTypeNewId, req.body);

    return new SuccessResponse<AddSubjectToClassTypeResponse>(
      "classType.subjectToClassTypeAddedSuccessfully",
    );
  }
}
