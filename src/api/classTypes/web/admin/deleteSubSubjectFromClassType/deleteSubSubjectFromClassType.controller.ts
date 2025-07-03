import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteSubSubjectFromClassTypeUseCase } from "../../../../../feature/classTypes/useCases/DeleteSubSubjectFromClassType.usecase";
import {
  DeleteSubSubjectFromClassTypeRouteConfig,
  DeleteSubSubjectFromClassTypeResponse,
} from "./deleteSubSubjectFromClassType.types";

@Controller()
export class DeleteSubSubjectFromClassTypeController extends BaseController<DeleteSubSubjectFromClassTypeRouteConfig> {
  constructor(
    @inject("DeleteSubSubjectFromClassTypeUseCase")
    private deleteSubSubjectFromClassTypeUseCase: DeleteSubSubjectFromClassTypeUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<DeleteSubSubjectFromClassTypeRouteConfig>,
  ): Promise<void | APIResponse> {
    const { classTypeNewId, subSubjectNewId } = req.params;

    await this.deleteSubSubjectFromClassTypeUseCase.execute(classTypeNewId, subSubjectNewId);

    return new SuccessResponse<DeleteSubSubjectFromClassTypeResponse>(
      "classType.subSubjectDeletedSuccessfully",
    );
  }
}
