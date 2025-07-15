import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetNotPromotedStudentsUsecase } from "../../../../../feature/examGrade/useCases/getNotPromotedStudentsOfLevel.usecase";
import {
  GetNotPromotedStudentsResponse,
  GetNotPromotedStudentsRouteConfig,
} from "./getNotPromotedStudents.types";

@Controller()
export class GetNotPromotedStudentsController extends BaseController<GetNotPromotedStudentsRouteConfig> {
  constructor(
    @inject("GetNotPromotedStudentsUsecase")
    private getNotPromotedStudentsUsecase: GetNotPromotedStudentsUsecase,
  ) {
    super();
  }

  async main(): Promise<void | APIResponse> {
    const result = await this.getNotPromotedStudentsUsecase.execute();

    return new SuccessResponse<GetNotPromotedStudentsResponse>("global.success", result);
  }
}
