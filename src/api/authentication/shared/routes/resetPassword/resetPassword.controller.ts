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
import { ResetPasswordResponse, ResetPasswordRouteConfig } from "./resetPassword.types";

@Controller()
export class ResetPasswordController extends BaseController<ResetPasswordRouteConfig> {
  constructor() {
    super();
  }

  async main(req: TypedRequest<ResetPasswordRouteConfig>): Promise<void | APIResponse> {
    const userType = req.userType;

    if (!userType || userType === END_USER_ENUM.MASTER)
      throw new BadRequestError("userType is required and should not be master");
    const school = getSchoolFromSubdomain(req.body.subdomain);
    if (!school) throw new BadRequestError("notFound.school");

    const connection = await getNewTenantConnection(school.subdomain);

    req.container.rebind("Connection").toConstantValue(connection);
    const resetPasswordUseCase = req.container.get("ResetPasswordUseCase");

    const response = await resetPasswordUseCase.execute({
      code: req.body.confirmationCode,
      credential: req.body.credential,
      userType,
      newPassword: req.body.newPassword,
    });

    return new SuccessResponse<ResetPasswordResponse>("global.success", response);
  }
}
