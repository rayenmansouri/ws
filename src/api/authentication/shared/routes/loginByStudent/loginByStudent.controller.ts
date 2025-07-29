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
import { SchoolMapper } from "../../../../../feature/schools/mappers/School.mapper";
import { LoginByStudentResponse, LoginByStudentRouteConfig } from "./loginByStudent.types";

@Controller()
export class LoginByStudentController extends BaseController<LoginByStudentRouteConfig> {
  constructor() {
    super();
  }

  async main(req: TypedRequest<LoginByStudentRouteConfig>): Promise<void | APIResponse> {
    const { credential, password, subdomain } = req.body;
    const userType = req.userType;
    if (!userType || userType === END_USER_ENUM.MASTER) {
      throw new BadRequestError("userType is required and cannot be master");
    }
    const school = getSchoolFromSubdomain(subdomain);
    if (!school) throw new BadRequestError("notFound.school");

    const connection = await getNewTenantConnection(school.subdomain);

    req.container.rebind("Connection").toConstantValue(connection);
    const loginUseCase = req.container.get("LoginUseCase");

    const response = await loginUseCase.execute({
      password,
      userType,
      credential,
    });

    const data = {
      ...response,
      school: response.isActive ? null : SchoolMapper.toSchoolDTO(school),
    } as LoginByStudentResponse;

    return new SuccessResponse<LoginByStudentResponse>("global.success", data);
  }
}
