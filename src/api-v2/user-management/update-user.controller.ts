import { BaseController } from "../../core/express/controllers/BaseController";
import { TypedRequest } from "../../core/express/types";
import { APIResponse } from "../../core/responseAPI/APIResponse";
import { UpdateUserResponse, UpdateUserRouteConfig } from "./updateUser.types";
import { SuccessResponse } from "../../core/responseAPI/APISuccessResponse";
import { UserTypeEnum } from "../../feature/user-management/factory/enums";
import { inject } from "../../core/container/TypedContainer";
import { Injectable } from "../../core/container/decorators/AutoRegister.decorator";
import { REPOSITORY_FACTORY_IDENTIFIER } from "../../feature/user-management/constants";
import { BadRequestError, NotFoundError } from "../../core/ApplicationErrors";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../feature/organization-magement/constant";
import { OrganizationRepository } from "../../feature/organization-magement/domain/organization.repo";
import { getParticipantValidationSchema } from "../../feature/user-management/factory/zod-schema.factory";
import { z } from "zod";
import { RepositoryFactory } from "../../feature/user-management/factory/repository.factory";

@Injectable({
  identifier: "UpdateUserController",
})
export class UpdateUserController extends BaseController<UpdateUserRouteConfig> {
  constructor(
    @inject(ORGANIZATION_REPOSITORY_IDENTIFIER) private schoolRepo: OrganizationRepository,
    @inject(REPOSITORY_FACTORY_IDENTIFIER) private repositoryFactory: RepositoryFactory,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateUserRouteConfig>): Promise<void | APIResponse> {
    const { firstName, lastName, gender, participantData = {} } = req.body;
    const { id } = req.params;
    
    // First, get the user to determine type and check existence
    const userRepository = this.repositoryFactory.getRepository();
    const existingUser = await userRepository.findById(id);
    if (!existingUser) throw new NotFoundError("global.userNotFound");
    
    // Get the correct repository for the user type
    const typedUserRepository = this.repositoryFactory.getRepository(existingUser.type);
    
    // Get organization for participant validation if needed
    const organization = await this.schoolRepo.findOne({ subdomain: existingUser.schoolSubdomain });
    if (!organization) throw new BadRequestError("global.schoolNotFound");
    
    typedUserRepository.organization = organization;
    
    // Validate participant data if provided
    if (existingUser.type === UserTypeEnum.PARTICIPANT && Object.keys(participantData).length > 0) {
      const organizationSystemType = organization.organizationSystemType;
      const participantSchema = getParticipantValidationSchema(organizationSystemType);
      
      try {
        participantSchema.parse(participantData);
      } catch (error: unknown) {    
        if (error instanceof z.ZodError) {
          throw new BadRequestError("user.invalidData", error.issues);
        }
        throw error;
      }
    }
    
    // Prepare update data
    const updateData: any = {};
    if (firstName !== undefined) {
      updateData.firstName = firstName;
      // Update fullName if firstName or lastName is provided
      updateData.fullName = `${firstName} ${existingUser.lastName}`;
    }
    if (lastName !== undefined) {
      updateData.lastName = lastName;
      // Update fullName if firstName or lastName is provided  
      updateData.fullName = `${existingUser.firstName} ${lastName}`;
    }
    if (firstName !== undefined && lastName !== undefined) {
      updateData.fullName = `${firstName} ${lastName}`;
    }
    if (gender !== undefined) updateData.gender = gender;
    if (Object.keys(participantData).length > 0) {
      Object.assign(updateData, participantData);
    }
    
    // Update in master database
    await typedUserRepository.updateById(id, updateData);
    
    // Update in tenant database
    typedUserRepository.switchConnection(existingUser.schoolSubdomain);
    const updatedUser = await typedUserRepository.updateById(id, updateData);
    
    return new SuccessResponse<UpdateUserResponse>("global.success", { user: updatedUser });
  }
}