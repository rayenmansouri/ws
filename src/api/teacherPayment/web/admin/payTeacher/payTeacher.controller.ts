import {
  PayTeacherUseCase,
  payTeacherRequestDto,
} from "./../../../../../feature/teacherPayment/usecases/payTeacher.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { PayTeacherRouteConfig, PayTeacherResponse } from "./payTeacher.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class PayTeacherController extends BaseController<PayTeacherRouteConfig> {
  constructor(@inject("PayTeacherUseCase") private readonly usecase: PayTeacherUseCase) {
    super();
  }

  async main(req: TypedRequest<PayTeacherRouteConfig>): Promise<void | APIResponse> {
    const dto: payTeacherRequestDto = {
      month: req.body.month,
      year: req.body.year,
      teacherNewId: req.params.teacherNewId,
      adminId: req.user._id,
      tenantId: req.tenantId,
    };

    await this.usecase.execute(dto);
    return new SuccessResponse<PayTeacherResponse>("global.success");
  }
}
