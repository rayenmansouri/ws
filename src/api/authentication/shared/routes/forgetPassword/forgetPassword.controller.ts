import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { BadRequestError } from "../../../../../core/ApplicationErrors";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  getNewTenantConnection,
  getSchoolFromSubdomain,
} from "../../../../../database/connectionDB/tenantPoolConnection";
import { ForgetPasswordResponse, ForgetPasswordRouteConfig } from "./forgetPassword.types";

@Controller()
export class ForgetPasswordController extends BaseController<ForgetPasswordRouteConfig> {
  constructor() {
    super();
  }

  async main(req: TypedRequest<ForgetPasswordRouteConfig>): Promise<void | APIResponse> {
    const { credential, subdomain } = req.body;
    const userType = req.userType;
    if (!userType || userType === END_USER_ENUM.MASTER)
      throw new BadRequestError("userType is required and should not be master");

    const school = getSchoolFromSubdomain(subdomain);
    const connection = await getNewTenantConnection(subdomain);
    req.container.rebind("School").toConstantValue(school);
    req.container.rebind("Connection").toConstantValue(connection);
    const forgetPasswordUseCase = req.container.get("ForgetPasswordUseCase");
    const response = await forgetPasswordUseCase.execute({
      credential,
      userType,
    });

    return new SuccessResponse<ForgetPasswordResponse>("global.success", response);
  }
}
