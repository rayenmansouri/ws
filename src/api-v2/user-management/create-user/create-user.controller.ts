import { BaseController } from "../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../core/express/types";
import { APIResponse } from "../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { inject } from "../../../core/container/TypedContainer";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../../feature/organization-magement/constant";
import { OrganizationRepository } from "../../../feature/organization-magement/domain/organization.repo";
import { AuthenticationHelper } from "../../../core/auth.helper";
import { ROLE_REPOSITORY_IDENTIFIER } from "../../../feature/roles/constant";
import { RoleRepository } from "../../../feature/roles/role.repo";
import { UserFactory, UserFactoryIdentifier } from "../../../feature/user-management/factory/abstract-factory";
import { CreateUserResponse, CreateUserRouteConfig } from "./create-user.types";
import { SeekingGradeParticipant } from "../../../feature/user-management/participant/enums";

@Injectable({
  identifier: "CreateUserController",
})
export class CreateUserController extends BaseController<CreateUserRouteConfig> {
  constructor(
    @inject(ORGANIZATION_REPOSITORY_IDENTIFIER) private schoolRepo: OrganizationRepository,
    @inject(ROLE_REPOSITORY_IDENTIFIER) private roleRepo: RoleRepository,
    @inject(UserFactoryIdentifier) private repositoryFactory: UserFactory,
  ) {
    super();
  }

  async main(req: TypedRequest<CreateUserRouteConfig>): Promise<void | APIResponse> {
    const { firstName, lastName, email, password,
            schoolSubdomain, type,phoneNumber,
            participantData = {}, gender, birthDate,
    } = req.body;
    
    // Get organization first to determine system type and seeking grade
    const organization = await this.schoolRepo.findOne({ subdomain: schoolSubdomain });
    if(!organization) throw new BadRequestError("global.schoolNotFound");
    
    const organizationSystemType = organization.organizationSystemType;
    // For participants, extract seeking grade from participantData, default to SEEKING_GRADE_PARTICIPANT
    const seekingGrade = type === "PARTICIPANT" ? 
      (participantData.seekingGrade as SeekingGradeParticipant || SeekingGradeParticipant.SEEKING_GRADE_PARTICIPANT) : 
      undefined;
    
    const userRepository = this.repositoryFactory.getRepository(type, organizationSystemType, seekingGrade);
    userRepository.organization = organization;
    
    //check if user already exists
    const existingUser = await userRepository.findOne({ email });
    if(existingUser) throw new BadRequestError("global.userAlreadyExists");
    
    this.repositoryFactory.validateUserInput({userType:type,organizationSystemType,data:req.body})
    const hashedPassword = await AuthenticationHelper.hashString(password);
    
    //get roles
    const roles = await this.roleRepo.findAll({
      userTypes: { $in: [type] }
    })
    if(roles.length === 0) throw new BadRequestError("global.roleNotFound");
   
    // Switch to tenant connection and create user
    userRepository.switchConnection(schoolSubdomain);
    const createdUser = await userRepository.create({
      firstName,
      lastName, 
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