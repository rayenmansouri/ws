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
import { SchoolMapper } from "../../../../../feature/schools/mappers/School.mapper";
import { CentralUserRepo } from "../../../../../feature/users/domain/CentralUser.repo";
import { LoginByStudentRouteConfig, LoginByStudentResponse } from "./loginByStudent.types";

@Controller()
export class LoginByStudentController extends BaseController<LoginByStudentRouteConfig> {
  constructor(@inject("CentralUserRepo") private centralUserRepo: CentralUserRepo) {
    super();
  }

  async main(req: TypedRequest<LoginByStudentRouteConfig>): Promise<void | APIResponse> {
    const { credential, password } = req.body;
    const userType = req.userType;
    if (!userType || userType === END_USER_ENUM.MASTER) {
      throw new BadRequestError("userType is required and cannot be master");
    }

    const user = await this.centralUserRepo.findByAnyIdentifier(credential, userType);
    if (!user) throw new BadRequestError("notFound.user");

    const school = schoolDocStore[user.tenantId];

    const connection = await getNewTenantConnection(school.subdomain);

    req.container.rebind("Connection").toConstantValue(connection);
    const loginUseCase = req.container.get("LoginUseCase");

    const response = await loginUseCase.execute({
      user,
      password,
      userType,
    });

    const data = {
      ...response,
      school: response.isActive ? null : SchoolMapper.toSchoolDTO(school),
    } as LoginByStudentResponse;

    return new SuccessResponse<LoginByStudentResponse>("global.success", data);
  }
}
