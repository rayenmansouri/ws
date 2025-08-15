import { InternalError } from "../../../../core/ApplicationErrors";
import { Injectable } from "../../../../core/container/decorators/AutoRegister.decorator";
import { inject } from "../../../../core/container/TypedContainer";
import { BaseController } from "../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../core/express/types";
import { APIResponse } from "../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../core/responseAPI/APISuccessResponse";
import { UPDATE_CURRENT_USER_PASSWORD_USE_CASE_IDENTIFIER } from "../../../../feature/authentication/useCases/constants";
import { UpdateCurrentUserPasswordUseCase } from "../../../../feature/authentication/useCases/UpdateCurrentUserPassword.usecase";
import { UpdateCurrentUserPasswordResponse, UpdateCurrentUserPasswordRouteConfig } from "./updateCurrentUserPassword.types";

@Injectable({
  identifier: "UpdateCurrentUserPasswordController",
})
export class UpdateCurrentUserPasswordController extends BaseController<UpdateCurrentUserPasswordRouteConfig> {
  constructor(
    @inject(UPDATE_CURRENT_USER_PASSWORD_USE_CASE_IDENTIFIER) private updateCurrentUserPasswordUseCase: UpdateCurrentUserPasswordUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateCurrentUserPasswordRouteConfig>): Promise<void | APIResponse> {
    const user = req.currentUser;
    const userType = req.userType;
    if (!userType) throw new InternalError("userType is not defined");

    const { currentPassword, newPassword } = req.body;

    const response = await this.updateCurrentUserPasswordUseCase.execute({
      user,
      currentPassword,
      newPassword,
    });
    return new SuccessResponse<UpdateCurrentUserPasswordResponse>("global.success", response);
  }
}
