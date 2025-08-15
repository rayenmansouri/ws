
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { BaseController } from "../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../core/express/types";
import { APIResponse } from "../../../../core/responseAPI/APIResponse";
import { UserRepository } from "../../../../feature/user-management/base-user/domain/base-user.repository";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../../../feature/user-management/constants";
import { ForgetPasswordResponse, ForgetPasswordRouteConfig } from "./forget-password.types";
import { CREATE_VERIFICATION_CODE_USE_CASE_IDENTIFIER } from "../../../../feature/authentication/useCases/constants";
import { ForgetPasswordUseCase } from "../../../../feature/authentication/useCases/CreateVerificationCode.usecase";
import { SuccessResponse } from "../../../../core/responseAPI/APISuccessResponse";
import { Injectable } from "../../../../core/container/decorators/AutoRegister.decorator";

@Injectable({
    identifier: "ForgetPasswordController",
})
export class ForgetPasswordController extends BaseController<ForgetPasswordRouteConfig> {
  constructor(
    @inject(BASE_USER_REPOSITORY_IDENTIFIER) private centralUserRepo: UserRepository,
    @inject(CREATE_VERIFICATION_CODE_USE_CASE_IDENTIFIER) private createVerificationCodeUseCase: ForgetPasswordUseCase
) {
    super();
  }

  async main(req: TypedRequest<ForgetPasswordRouteConfig>): Promise<void | APIResponse> {
    const { credential, userType } = req.body;
    const user = await this.centralUserRepo.findOne({
      $or: [
        { email: credential},
        { phoneNumber: credential}
      ]
    });
    if (!user) throw new BadRequestError("notFound.user");
    req.container.bind("School").toConstantValue(user.schoolSubdomain);
    const response = await this.createVerificationCodeUseCase.execute({
        credential,
        userType,
        user,
    });

    return new SuccessResponse<ForgetPasswordResponse>("global.success", response);
  }
}
