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
import { ForgetPasswordResponse, ForgetPasswordRouteConfig } from "./forgetPassword.types";

@Controller()
export class ForgetPasswordController extends BaseController<ForgetPasswordRouteConfig> {
  constructor(@inject("CentralUserRepo") private centralUserRepo: CentralUserRepo) {
    super();
  }

  async main(req: TypedRequest<ForgetPasswordRouteConfig>): Promise<void | APIResponse> {
    const { credential } = req.body;
    const userType = req.userType;
    if (!userType || userType === END_USER_ENUM.MASTER)
      throw new BadRequestError("userType is required and should not be master");

    const isEmail = credential.includes("@");
    const user = isEmail
      ? await this.centralUserRepo.findOneByEmail(credential, userType)
      : await this.centralUserRepo.findOneByPhoneNumber(credential, userType);
    if (!user) throw new BadRequestError("notFound.user");
    const school = schoolDocStore[user.tenantId];
    req.container.rebind("School").toConstantValue(school);
    const subdomain = school.subdomain;
    const connection = await getNewTenantConnection(subdomain);
    req.container.rebind("Connection").toConstantValue(connection);
    const forgetPasswordUseCase = req.container.get("ForgetPasswordUseCase");
    const response = await forgetPasswordUseCase.execute({
      credential,
      userType,
      user,
    });

    return new SuccessResponse<ForgetPasswordResponse>("global.success", response);
  }
}
