import { BaseController } from "../../core/express/controllers/BaseController";
import { TypedRequest } from "../../core/express/types";
import { APIResponse } from "../../core/responseAPI/APIResponse";
import { CreateUserResponse, CreateUserRouteConfig } from "./createUser.types";
import { UserRepository } from "../../feature/user-management/base-user/domain/base-user.repository";
import { SuccessResponse } from "../../core/responseAPI/APISuccessResponse";
import { UserTypeEnum } from "../../feature/user-management/factory/enums";
import { inject } from "../../core/container/TypedContainer";
import { Injectable } from "../../core/container/decorators/AutoRegister.decorator";
import { BASE_USER_REPOSITORY_IDENTIFIER, REPOSITORY_FACTORY_IDENTIFIER } from "../../feature/user-management/constants";
import { BadRequestError } from "../../core/ApplicationErrors";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../feature/organization-magement/constant";
import { OrganizationRepository } from "../../feature/organization-magement/domain/organization.repo";
import { AuthenticationHelper } from "../../core/auth.helper";
import { ROLE_REPOSITORY_IDENTIFIER } from "../../feature/roles/constant";
import { RoleRepository } from "../../feature/roles/role.repo";
import { getParticipantValidationSchema } from "../../feature/user-management/factory/zod-schema.factory";
import { z } from "zod";
import { RepositoryFactory } from "../../feature/user-management/factory/repository.factory";
import { UserRoleMap } from "../../feature/roles/enums";

@Injectable({
  identifier: "CreateUserController",
})
export class CreateUserController extends BaseController<CreateUserRouteConfig> {
  constructor(
    @inject(ORGANIZATION_REPOSITORY_IDENTIFIER) private schoolRepo: OrganizationRepository,
    @inject(ROLE_REPOSITORY_IDENTIFIER) private roleRepo: RoleRepository,
    @inject(REPOSITORY_FACTORY_IDENTIFIER) private repositoryFactory: RepositoryFactory,
  ) {
    super();
  }

  async main(req: TypedRequest<CreateUserRouteConfig>): Promise<void | APIResponse> {
    const { firstName, lastName, email, password,
            schoolSubdomain, type,phoneNumber,
            participantData = {}, gender, birthDate,
    } = req.body;
    const userRepository = this.repositoryFactory.getRepository(type);
    //check if user already exists
    const existingUser = await userRepository.findOne({ email });
    if(existingUser) throw new BadRequestError("global.userAlreadyExists");
    const organization = await this.schoolRepo.findOne({ subdomain: schoolSubdomain });
    if(!organization) throw new BadRequestError("global.schoolNotFound");
    userRepository.organization = organization;
    const organizationSystemType = organization.organizationSystemType;
    const participantSchema = getParticipantValidationSchema(organizationSystemType);
    if (type === UserTypeEnum.PARTICIPANT && Object.keys(participantData).length > 0) {
      try {
        participantSchema.parse(participantData);
      } catch (error: unknown) {    
        if(error instanceof z.ZodError ) {
          throw new BadRequestError("user.invalidData",error.issues);
        }
        throw error;
      }
    }
    const hashedPassword = await AuthenticationHelper.hashString(password);
    //get roles
    const roles = await this.roleRepo.findAll({
      userTypes: { $in: [type] }
    })
    if(roles.length === 0) throw new BadRequestError("global.roleNotFound");
    await userRepository.create({
      firstName,
      lastName, 
      fullName: `${firstName} ${lastName}`,
      email,
      phoneNumber,
      password:hashedPassword,
      schoolSubdomain,
      type: type,
      roles: roles.map(role => role.id),
      gender,
      birthDate,
      ...participantData
    });
   
    //hash password
    userRepository.switchConnection(schoolSubdomain);
    const createdUser = await userRepository.create({
      firstName,
      lastName, 
      fullName: `${firstName} ${lastName}`,
      email,
      phoneNumber,
      password: hashedPassword,
      schoolSubdomain,
      type: type,
      roles: roles.map(role => role.id),
      gender,
      birthDate,
      ...participantData
    });
    return new SuccessResponse<CreateUserResponse>("global.success", { user: createdUser });
  }
}