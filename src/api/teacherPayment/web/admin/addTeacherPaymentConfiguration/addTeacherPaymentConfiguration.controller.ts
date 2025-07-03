import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  addTeacherPaymentConfigurationRequestDto,
  AddTeacherPaymentConfigurationUseCase,
} from "./../../../../../feature/teacherPayment/usecases/addTeacherPaymentConfiguration.usecase";
import {
  AddTeacherPaymentConfigurationResponse,
  AddTeacherPaymentConfigurationRouteConfig,
} from "./addTeacherPaymentConfiguration.types";

@Controller()
export class AddTeacherPaymentConfigurationController extends BaseController<AddTeacherPaymentConfigurationRouteConfig> {
  constructor(
    @inject("AddTeacherPaymentConfigurationUseCase")
    private readonly useCase: AddTeacherPaymentConfigurationUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<AddTeacherPaymentConfigurationRouteConfig>,
  ): Promise<void | APIResponse> {
    const dto: addTeacherPaymentConfigurationRequestDto = {
      teacherNewId: req.params.teacherNewId,
      paymentType: req.body.paymentType,
      contractType: req.body.contractType,
      amount: req.body.amount,
      bankAccountId: req.body.bankAccountId ?? null,
      files: req.files?.attachment?.map(attachment => {
        return {
          mimetype: attachment.mimetype,
          buffer: attachment.buffer,
          name: attachment.originalname,
        };
      }),
    };
    await this.useCase.execute(dto);
    return new SuccessResponse<AddTeacherPaymentConfigurationResponse>("global.success");
  }
}
