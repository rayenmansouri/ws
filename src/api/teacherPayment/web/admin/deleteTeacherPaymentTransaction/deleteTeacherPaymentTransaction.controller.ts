import {
  DeleteTeacherPaymentTransactionUseCase,
  deleteTeacherPaymentTransactionRequestDto,
} from "./../../../../../feature/teacherPayment/usecases/deleteTeacherPaymentTransaction.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  DeleteTeacherPaymentTransactionRouteConfig,
  DeleteTeacherPaymentTransactionResponse,
} from "./deleteTeacherPaymentTransaction.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class DeleteTeacherPaymentTransactionController extends BaseController<DeleteTeacherPaymentTransactionRouteConfig> {
  constructor(
    @inject("DeleteTeacherPaymentTransactionUseCase")
    private readonly usecase: DeleteTeacherPaymentTransactionUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<DeleteTeacherPaymentTransactionRouteConfig>,
  ): Promise<void | APIResponse> {
    const dto: deleteTeacherPaymentTransactionRequestDto = {
      transactionId: req.body.transactionId,
      teacherPaymentHistoryId: req.params.teacherPaymentId,
    };

    await this.usecase.execute(dto);
    return new SuccessResponse<DeleteTeacherPaymentTransactionResponse>("global.success");
  }
}
