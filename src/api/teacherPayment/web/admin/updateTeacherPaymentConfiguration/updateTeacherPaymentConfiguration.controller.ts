import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  UpdateTeacherPaymentConfigurationUseCase,
  updateTeacherPaymentConfigurationRequestDto,
} from "./../../../../../feature/teacherPayment/usecases/updateTeacherPaymentConfiguration.usecase";
import {
  UpdateTeacherPaymentConfigurationResponse,
  UpdateTeacherPaymentConfigurationRouteConfig,
} from "./updateTeacherPaymentConfiguration.types";

@Controller()
export class UpdateTeacherPaymentConfigurationController extends BaseController<UpdateTeacherPaymentConfigurationRouteConfig> {
  constructor(
    @inject("updateTeacherPaymentConfigurationUseCase")
    private readonly usecase: UpdateTeacherPaymentConfigurationUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<UpdateTeacherPaymentConfigurationRouteConfig>,
  ): Promise<void | APIResponse> {
    const dto: updateTeacherPaymentConfigurationRequestDto = {
      ...req.body,
      teacherNewId: req.params.teacherNewId,
      files: req.files?.attachment?.map(attachment => {
        return {
          mimetype: attachment.mimetype,
          buffer: attachment.buffer,
          name: attachment.originalname,
        };
      }),
    };

    await this.usecase.execute(dto);

    return new SuccessResponse<UpdateTeacherPaymentConfigurationResponse>("global.success");
  }
}
