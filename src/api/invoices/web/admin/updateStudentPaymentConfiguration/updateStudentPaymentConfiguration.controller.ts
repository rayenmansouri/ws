import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateStudentPaymentConfigurationUseCase } from "../../../../../feature/invoices/useCases/UpdateStudentPaymentConfiguration.usecase";
import {
  UpdateStudentPaymentConfigurationRouteConfig,
  UpdateStudentPaymentConfigurationResponse,
} from "./updateStudentPaymentConfiguration.types";

@Controller()
export class UpdateStudentPaymentConfigurationController extends BaseController<UpdateStudentPaymentConfigurationRouteConfig> {
  constructor(
    @inject("UpdateStudentPaymentConfigurationUseCase")
    private updateStudentPaymentConfigurationUseCase: UpdateStudentPaymentConfigurationUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<UpdateStudentPaymentConfigurationRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.updateStudentPaymentConfigurationUseCase.execute({
      ...req.body,
      studentNewId: req.params.studentNewId,
    });

    return new SuccessResponse<UpdateStudentPaymentConfigurationResponse>(
      "global.success",
      response,
    );
  }
}
