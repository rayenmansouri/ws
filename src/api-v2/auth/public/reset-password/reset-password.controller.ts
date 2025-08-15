import { END_USER_ENUM } from "../../../../constants/globalEnums";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { Injectable } from "../../../../core/container/decorators/AutoRegister.decorator";
import { inject } from "../../../../core/container/TypedContainer";
import { BaseController } from "../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../core/express/types";
import { APIResponse } from "../../../../core/responseAPI/APIResponse";
import { UserRepository } from "../../../../feature/user-management/base-user/domain/base-user.repository";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../../../feature/user-management/constants";
import { ResetPasswordResponse, ResetPasswordRouteConfig } from "./reset-password.types";
import { RESET_PASSWORD_USE_CASE, ResetPasswordUseCase } from "../../../../feature/authentication/useCases/reset-password.usecase";
import { SuccessResponse } from "../../../../core/responseAPI/APISuccessResponse";

@Injectable({
    identifier: "ResetPasswordController"
})
export class ResetPasswordController extends BaseController<ResetPasswordRouteConfig> {
  constructor(
    @inject(BASE_USER_REPOSITORY_IDENTIFIER) private centralUserRepo: UserRepository,
    @inject(RESET_PASSWORD_USE_CASE) private resetPasswordUseCase: ResetPasswordUseCase
) {
    super();
  }

  async main(req: TypedRequest<ResetPasswordRouteConfig>): Promise<void | APIResponse> {
    const credential = req.body.credential;
    const userType = req.userType;

    if (!userType || userType == END_USER_ENUM.MASTER)
      throw new BadRequestError("userType is required and should not be master");


    const user = await this.centralUserRepo.findOne({
        $or: [
          { email: credential},
          { phoneNumber: credential}
        ]
    });

    if (!user) throw new BadRequestError("notFound.user");

    const response = await this.resetPasswordUseCase.execute({
      code: req.body.confirmationCode,
      user: user,
      newPassword: req.body.newPassword,
    });

    return new SuccessResponse<ResetPasswordResponse>("global.success", response);
  }
}
