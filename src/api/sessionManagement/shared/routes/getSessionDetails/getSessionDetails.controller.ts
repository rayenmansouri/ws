import { GetSessionDetailsRequestDTO } from "./../../../../../feature/sessionManagement/useCases/getSessionDetails.usecase";
import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetSessionDetailsUseCase } from "../../../../../feature/sessionManagement/useCases/getSessionDetails.usecase";
import { ID } from "../../../../../types/BaseEntity";
import { GetSessionDetailsRouteConfig, GetSessionDetailsResponse } from "./getSessionDetails.types";

@Controller()
export class GetSessionDetailsController extends BaseController<GetSessionDetailsRouteConfig> {
  constructor(
    @inject("GetSessionDetailsUseCase") private getSessionDetailsUseCase: GetSessionDetailsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetSessionDetailsRouteConfig>): Promise<void | APIResponse> {
    const userDetails = {
      user: req.user,
      type: req.userType as TEndUserEnum,
    };

    const dto: GetSessionDetailsRequestDTO = {
      userDetails,
      sessionNewId: req.params.sessionNewId,
      tenantId: req.tenantId,
    };

    const response = await this.getSessionDetailsUseCase.execute(dto);

    return new SuccessResponse<GetSessionDetailsResponse>("global.success", response);
  }
}
