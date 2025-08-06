import { BaseController } from "../../core/express/controllers/BaseController";
import { TypedRequest } from "../../core/express/types";
import { APIResponse } from "../../core/responseAPI/APIResponse";
import { CreateUserResponse, CreateUserRouteConfig } from "./createUser.types";
import { UserRepository } from "../../feature/user-management/base-user/domain/base-user.repository";
import { SuccessResponse } from "../../core/responseAPI/APISuccessResponse";
import { UserTypeEnum } from "../../feature/user-management/factory/enums";
import { inject } from "../../core/container/TypedContainer";
import { Injectable } from "../../core/container/decorators/AutoRegister.decorator";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../feature/user-management/constants";
import { BadRequestError } from "../../core/ApplicationErrors";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../feature/organization-magement/constant";
import { OrganizationRepository } from "../../feature/organization-magement/domain/organization.repo";
import { AuthenticationHelper } from "../../core/auth.helper";
import { ROLE_REPOSITORY_IDENTIFIER } from "../../feature/roles/constant";
import { RoleRepository } from "../../feature/roles/role.repo";

@Injectable({
  identifier: "CreateUserController",
})
export class CreateUserController extends BaseController<CreateUserRouteConfig> {
  constructor(
    @inject(BASE_USER_REPOSITORY_IDENTIFIER) private userRepo: UserRepository,
    @inject(ORGANIZATION_REPOSITORY_IDENTIFIER) private schoolRepo: OrganizationRepository,
    @inject(ROLE_REPOSITORY_IDENTIFIER) private roleRepo: RoleRepository,
  ) {
    super();
  }

  async main(req: TypedRequest<CreateUserRouteConfig>): Promise<void | APIResponse> {
    const { firstName, lastName, email, password, organizationSubdomain, type } = req.body;
    //check if user already exists
    const existingUser = await this.userRepo.findOne({ email });
    if(existingUser) throw new BadRequestError("global.userAlreadyExists");
    const organization = await this.schoolRepo.findOne({ subdomain: organizationSubdomain });
    if(!organization) throw new BadRequestError("global.organizationNotFound");
    const hashedPassword = await AuthenticationHelper.hashString(password);
    //get roles
    const roles = await this.roleRepo.findAll({
      name: type
    })
    if(roles.length === 0) throw new BadRequestError("global.roleNotFound");
    await this.userRepo.create({
      firstName,
      lastName, 
      fullName: `${firstName} ${lastName}`,
      email,
      password:hashedPassword,
      schoolSubdomain: organizationSubdomain,
      type: type as UserTypeEnum,
      roles: roles.map(role => role.id)
    });
   
    //hash password
    this.userRepo.switchConnection(organizationSubdomain);
    const createdUser = await this.userRepo.create({
      firstName,
      lastName, 
      fullName: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      schoolSubdomain: organizationSubdomain,
      type: type as UserTypeEnum,
      roles: roles.map(role => role.id)
    });
    return new SuccessResponse<CreateUserResponse>("global.success", { user: createdUser });
  }
}