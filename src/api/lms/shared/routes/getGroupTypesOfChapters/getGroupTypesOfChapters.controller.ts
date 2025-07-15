import { TEndAdministrationUserEnums } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetGroupTypesOfChaptersUseCase } from "../../../../../feature/lms/useCases/GetGroupTypesOfChapters.usecase";
import {
  GetGroupTypesOfChaptersRouteConfig,
  GetGroupTypesOfChaptersResponse,
} from "./getGroupTypesOfChapters.types";

@Controller()
export class GetGroupTypesOfChaptersController extends BaseController<GetGroupTypesOfChaptersRouteConfig> {
  constructor(
    @inject("GetGroupTypesOfChaptersUseCase")
    private getGroupTypesOfChaptersUseCase: GetGroupTypesOfChaptersUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetGroupTypesOfChaptersRouteConfig>): Promise<void | APIResponse> {
    const { _id } = req.user;
    const response = await this.getGroupTypesOfChaptersUseCase.execute({
      userId: _id,
      userType: req.userType as TEndAdministrationUserEnums,
    });
    return new SuccessResponse<GetGroupTypesOfChaptersResponse>("global.success", response);
  }
}
