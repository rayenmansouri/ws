import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetTeacherPaymentConfigurationUseCase,
  getTeacherPaymentConfigurationRequestDto,
} from "./../../../../../feature/teacherPayment/usecases/getTeacherPaymentConfiguration.usecase";
import {
  GetTeacherPaymentConfigurationResponse,
  GetTeacherPaymentConfigurationRouteConfig,
} from "./getTeacherPaymentConfiguration.types";

@Controller()
export class GetTeacherPaymentConfigurationController extends BaseController<GetTeacherPaymentConfigurationRouteConfig> {
  constructor(
    @inject("GetTeacherPaymentConfigurationUseCase")
    private usecase: GetTeacherPaymentConfigurationUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetTeacherPaymentConfigurationRouteConfig>,
  ): Promise<void | APIResponse> {
    const dto: getTeacherPaymentConfigurationRequestDto = {
      teacherNewId: req.params.teacherNewId,
    };

    const result = await this.usecase.execute(dto);
    return new SuccessResponse<GetTeacherPaymentConfigurationResponse>("global.success", result);
  }
}
