import { BaseController } from "../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../core/express/types";
import { APIResponse } from "../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { inject } from "../../../core/container/TypedContainer";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { BadRequestError, NotFoundError } from "../../../core/ApplicationErrors";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../../feature/organization-magement/constant";
import { OrganizationRepository } from "../../../feature/organization-magement/domain/organization.repo";
import { AuthenticationHelper } from "../../../core/auth.helper";
import { ROLE_REPOSITORY_IDENTIFIER } from "../../../feature/roles/constant";
import { RoleRepository } from "../../../feature/roles/role.repo";
import { UserRepository } from "../../../feature/user-management/base-user/domain/base-user.repository";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../../feature/user-management/constants";
import { UpdateUserResponse, UpdateUserRouteConfig } from "./updateUser.types";

@Injectable({
  identifier: "UpdateUserController",
})
export class UpdateUserController extends BaseController<UpdateUserRouteConfig> {
  constructor(
    @inject(BASE_USER_REPOSITORY_IDENTIFIER) private userRepo: UserRepository,
    @inject(ORGANIZATION_REPOSITORY_IDENTIFIER) private schoolRepo: OrganizationRepository,
    @inject(ROLE_REPOSITORY_IDENTIFIER) private roleRepo: RoleRepository,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateUserRouteConfig>): Promise<void | APIResponse> {
    const { userId } = req.params;
    const { 
      firstName, 
      lastName, 
      email, 
      password,
      type,
      phoneNumber,
      gender, 
      birthDate,
    } = req.body;

    // Find the existing user
    const existingUser = await this.userRepo.findOne({ _id: userId });
    if (!existingUser) {
      throw new NotFoundError("notFound.user");
    }

    // Get organization for validation if schoolSubdomain exists
    if (existingUser.schoolSubdomain) {
      const organization = await this.schoolRepo.findOne({ subdomain: existingUser.schoolSubdomain });
      if (!organization) {
        throw new BadRequestError("notFound.school");
      }
    }

    // If email is being updated, check for conflicts
    if (email && email !== existingUser.email) {
      const emailConflict = await this.userRepo.findOne({ email });
      if (emailConflict) {
        throw new BadRequestError("alert.userAlreadyExists");
      }
    }

    // Prepare update data
    const updateData: any = {};
    
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (firstName || lastName) {
      updateData.fullName = `${firstName || existingUser.firstName} ${lastName || existingUser.lastName}`;
    }
    if (email) updateData.email = email;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (gender) updateData.gender = gender;
    if (birthDate) updateData.birthDate = birthDate;
    
    // Hash password if provided
    if (password) {
      updateData.password = await AuthenticationHelper.hashString(password);
    }
    
    // Handle type change and roles update
    if (type && type !== existingUser.type) {
      updateData.type = type;
      
      // Get new roles based on the new type
      const roles = await this.roleRepo.findAll({
        userTypes: { $in: [type] }
      });
      
      if (roles.length === 0) {
        throw new BadRequestError("global.roleNotFound");
      }
      
      updateData.roles = roles.map(role => role.id);
    }

    // Switch to tenant connection if needed and update
    if (existingUser.schoolSubdomain) {
      this.userRepo.switchConnection(existingUser.schoolSubdomain);
    }
    
    const updatedUser = await this.userRepo.updateOne({ _id: userId }, updateData);
    
    if (!updatedUser) {
      throw new NotFoundError("global.userUpdateFailed");
    }

    return new SuccessResponse<UpdateUserResponse>("global.success", { user: updatedUser });
  }
}