import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateStudentPromotionStatusUsecase } from "../../../../../feature/examGrade/useCases/UpdateStudentPromotionStatus.usecase";
import {
  UpdateStudentPromotionStatusRouteConfig,
  UpdateStudentPromotionStatusResponse,
} from "./updateStudentPromotionStatus.types";

@Controller()
export class UpdateStudentPromotionStatusController extends BaseController<UpdateStudentPromotionStatusRouteConfig> {
  constructor(
    @inject("UpdateStudentPromotionStatusUsecase")
    private updateStudentPromotionStatusUsecase: UpdateStudentPromotionStatusUsecase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<UpdateStudentPromotionStatusRouteConfig>,
  ): Promise<void | APIResponse> {
    await this.updateStudentPromotionStatusUsecase.execute(
      req.params.studentNewId,
      req.body.promotionStatus,
    );

    return new SuccessResponse<UpdateStudentPromotionStatusResponse>("global.success");
  }
}
