import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetStudentPaymentConfigurationUseCase } from "../../../../../feature/invoices/useCases/GetStudentPaymentConfiguration.usecase";
import {
  GetStudentPaymentConfigurationRouteConfig,
  GetStudentPaymentConfigurationResponse,
} from "./getStudentPaymentConfiguration.types";

@Controller()
export class GetStudentPaymentConfigurationController extends BaseController<GetStudentPaymentConfigurationRouteConfig> {
  constructor(
    @inject("GetStudentPaymentConfigurationUseCase")
    private getStudentPaymentConfigurationUseCase: GetStudentPaymentConfigurationUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetStudentPaymentConfigurationRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.getStudentPaymentConfigurationUseCase.execute({
      studentNewId: req.params.studentNewId,
    });
    return new SuccessResponse<GetStudentPaymentConfigurationResponse>("global.success", response);
  }
}
