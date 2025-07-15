import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { BadRequestError } from "../../../../../core/ApplicationErrors";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { schoolDocStore } from "../../../../../core/subdomainStore";
import { getNewTenantConnection } from "../../../../../database/connectionDB/tenantPoolConnection";
import { CentralUserRepo } from "../../../../../feature/users/domain/CentralUser.repo";
import { ResetPasswordRouteConfig, ResetPasswordResponse } from "./resetPassword.types";

@Controller()
export class ResetPasswordController extends BaseController<ResetPasswordRouteConfig> {
  constructor(@inject("CentralUserRepo") private centralUserRepo: CentralUserRepo) {
    super();
  }

  async main(req: TypedRequest<ResetPasswordRouteConfig>): Promise<void | APIResponse> {
    const credential = req.body.credential;
    const userType = req.userType;

    if (!userType || userType === END_USER_ENUM.MASTER)
      throw new BadRequestError("userType is required and should not be master");

    const isEmail = credential.includes("@");

    const centralUser = isEmail
      ? await this.centralUserRepo.findOneByEmail(credential, userType)
      : await this.centralUserRepo.findOneByPhoneNumber(credential, userType);

    if (!centralUser) throw new BadRequestError("notFound.user");

    const school = schoolDocStore[centralUser.tenantId];

    const connection = await getNewTenantConnection(school.subdomain);

    req.container.rebind("Connection").toConstantValue(connection);
    const resetPasswordUseCase = req.container.get("ResetPasswordUseCase");

    const response = await resetPasswordUseCase.execute({
      code: req.body.confirmationCode,
      user: centralUser,
      userType,
      newPassword: req.body.newPassword,
    });

    return new SuccessResponse<ResetPasswordResponse>("global.success", response);
  }
}
