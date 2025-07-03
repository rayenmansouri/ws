import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { InternalError, NotFoundError } from "../../../../../core/ApplicationErrors";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { schoolDocStore } from "../../../../../core/subdomainStore";
import { getNewTenantConnection } from "../../../../../database/connectionDB/tenantPoolConnection";
import { CentralUserRepo } from "../../../../../feature/users/domain/CentralUser.repo";
import { VerifyCodeRouteConfig, VerifyCodeResponse } from "./verifyCode.types";

@Controller()
export class VerifyCodeController extends BaseController<VerifyCodeRouteConfig> {
  constructor(@inject("CentralUserRepo") private centralUserRepo: CentralUserRepo) {
    super();
  }

  async main(req: TypedRequest<VerifyCodeRouteConfig>): Promise<void | APIResponse> {
    const { confirmationCode, credential } = req.body;
    const userType = req.userType;
    if (!userType || userType === END_USER_ENUM.MASTER) {
      throw new InternalError("User type is not defined or is master");
    }

    const isEmail = credential.includes("@");

    const user = isEmail
      ? await this.centralUserRepo.findOneByEmail(credential, userType)
      : await this.centralUserRepo.findOneByPhoneNumber(credential, userType);

    if (!user) throw new NotFoundError("notFound.user");

    const school = schoolDocStore[user.tenantId];

    const connection = await getNewTenantConnection(school.subdomain);

    req.container.rebind("Connection").toConstantValue(connection);

    const verifyCodeUseCase = req.container.get("VerifyCodeUseCase");

    await verifyCodeUseCase.execute({
      code: confirmationCode,
      user,
      userType,
    });

    return new SuccessResponse<VerifyCodeResponse>("global.success");
  }
}
