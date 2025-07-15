import { NotFoundError } from "../../../../../core/ApplicationErrors";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { getSchoolFromSubdomain } from "../../../../../database/connectionDB/tenantPoolConnection";
import {
  GetSchoolPreRegistrationRouteConfig,
  GetSchoolPreRegistrationResponse,
} from "./getSchoolPreRegistration.types";

@Controller()
export class GetSchoolPreRegistrationController extends BaseController<GetSchoolPreRegistrationRouteConfig> {
  constructor() {
    super();
  }

  async main(req: TypedRequest<GetSchoolPreRegistrationRouteConfig>): Promise<void | APIResponse> {
    const school = getSchoolFromSubdomain(req.query.subdomain);

    if (!school) throw new NotFoundError("notFound.school");

    return new SuccessResponse<GetSchoolPreRegistrationResponse>("global.success", {
      schoolName: school.name,
      schoolPhoneNumber: school.phoneNumber,
    });
  }
}
