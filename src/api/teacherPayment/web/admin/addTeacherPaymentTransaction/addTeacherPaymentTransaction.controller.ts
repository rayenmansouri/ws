import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  AddTeacherPaymentTransactionRouteConfig,
  AddTeacherPaymentTransactionResponse,
} from "./addTeacherPaymentTransaction.types";
import {
  AddTeacherPaymentTransactionUseCase,
  AddTeacherPaymentTransactionRequestDto,
} from "../../../../../feature/teacherPayment/usecases/addTeacherPaymentTransaction.usecase";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class AddTeacherPaymentTransactionController extends BaseController<AddTeacherPaymentTransactionRouteConfig> {
  constructor(
    @inject("addTeacherPaymentTransactionUseCase")
    private readonly usecase: AddTeacherPaymentTransactionUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<AddTeacherPaymentTransactionRouteConfig>,
  ): Promise<void | APIResponse> {
    const dto: AddTeacherPaymentTransactionRequestDto = {
      teacherNewId: req.params.teacherNewId,
      adminId: req.user._id,
      tenantId: req.tenantId,
      month: req.body.month,
      year: req.body.year,
      name: req.body.name,
      type: req.body.type,
      amount: req.body.amount,
    };

    await this.usecase.execute(dto);
    return new SuccessResponse<AddTeacherPaymentTransactionResponse>("global.success");
  }
}
