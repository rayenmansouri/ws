import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetStudentDocumentsQueryUseCase } from "../../../../../feature/documents/useCases/GetStudentDocumentsQuery.usecase";
import {
  GetStudentDocumentsFilterRouteConfig,
  GetStudentDocumentsFilterResponse,
} from "./getStudentDocumentsFilter.types";

@Controller()
export class GetStudentDocumentsFilterController extends BaseController<GetStudentDocumentsFilterRouteConfig> {
  constructor(
    @inject("GetStudentDocumentsQueryUseCase")
    private getStudentDocumentsQueryUseCase: GetStudentDocumentsQueryUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetStudentDocumentsFilterRouteConfig>): Promise<void | APIResponse> {
    const studentNewId = req.params.studentNewId;

    const response = await this.getStudentDocumentsQueryUseCase.execute(studentNewId);
    return new SuccessResponse<GetStudentDocumentsFilterResponse>("global.success", response);
  }
}
