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
import { School } from "../../../../../feature/schools/domain/school.entity";
import { SchoolMapper } from "../../../../../feature/schools/mappers/School.mapper";
import { CentralUserRepo } from "../../../../../feature/users/domain/CentralUser.repo";
import { LoginRouteConfig, LoginResponse } from "./login.types";

@Controller()
export class LoginController extends BaseController<LoginRouteConfig> {
  constructor(
    @inject("CentralUserRepo") private centralUserRepo: CentralUserRepo, // Replace with actual type
  ) {
    super();
  }

  async main(req: TypedRequest<LoginRouteConfig>): Promise<void | APIResponse> {
    const { credential, password } = req.body;
    const userType = req.userType;
    if (!userType || userType === END_USER_ENUM.MASTER) {
      throw new BadRequestError("userType is required and cannot be master");
    }

    const user = await this.centralUserRepo.findByAnyIdentifier(credential, userType);
    if (!user) throw new BadRequestError("notFound.user");

    const school = schoolDocStore[user.tenantId] as School | undefined;
    if (!school) throw new BadRequestError("notFound.school");

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
    } as LoginResponse;

    return new SuccessResponse<LoginResponse>("global.success", data);
  }
}
