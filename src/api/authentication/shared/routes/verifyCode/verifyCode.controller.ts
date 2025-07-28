import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { InternalError, NotFoundError } from "../../../../../core/ApplicationErrors";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  getNewTenantConnection,
  getSchoolFromSubdomain,
} from "../../../../../database/connectionDB/tenantPoolConnection";
import { UsersRepo } from "../../../../../feature/users/domain/user.repo";
import { VerifyCodeResponse, VerifyCodeRouteConfig } from "./verifyCode.types";

@Controller()
export class VerifyCodeController extends BaseController<VerifyCodeRouteConfig> {
  constructor(@inject("UsersRepo") private usersRepo: UsersRepo) {
    super();
  }

  async main(req: TypedRequest<VerifyCodeRouteConfig>): Promise<void | APIResponse> {
    const { confirmationCode, credential, subdomain } = req.body;
    const userType = req.userType;
    if (!userType || userType === END_USER_ENUM.MASTER) {
      throw new InternalError("User type is not defined or is master");
    }
    const user = await this.usersRepo.findByIdentifierOrThrow(credential, userType);

    const school = getSchoolFromSubdomain(subdomain);
    if (!school) throw new NotFoundError("School not found");

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
