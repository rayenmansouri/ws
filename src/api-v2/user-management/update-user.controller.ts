import { BaseController } from "../../core/express/controllers/BaseController";
import { TypedRequest } from "../../core/express/types";
import { APIResponse } from "../../core/responseAPI/APIResponse";
import { UpdateUserResponse, UpdateUserRouteConfig } from "./update-user.types";
import { UserRepository } from "../../feature/user-management/base-user/domain/base-user.repository";
import { SuccessResponse } from "../../core/responseAPI/APISuccessResponse";
import { UserTypeEnum } from "../../feature/user-management/factory/enums";
import { inject } from "../../core/container/TypedContainer";
import { Injectable } from "../../core/container/decorators/AutoRegister.decorator";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../feature/user-management/constants";
import { BadRequestError, NotFoundError } from "../../core/ApplicationErrors";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../feature/organization-magement/constant";
import { OrganizationRepository } from "../../feature/organization-magement/domain/organization.repo";
import { AuthenticationHelper } from "../../core/auth.helper";
import { ROLE_REPOSITORY_IDENTIFIER } from "../../feature/roles/constant";
import { RoleRepository } from "../../feature/roles/role.repo";

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
    const { firstName, lastName, email, password, schoolSubdomain, type } = req.body;

    const existingUser = await this.userRepo.findOne({ _id: userId });
    if (!existingUser) throw new NotFoundError("notFound.user");

    if (email && email !== existingUser.email) {
      const emailExists = await this.userRepo.findOne({ email });
      if (emailExists) throw new BadRequestError("alreadyUsed.email");
    }

    const updateData: any = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (schoolSubdomain) updateData.schoolSubdomain = schoolSubdomain;

    if (firstName || lastName) {
      updateData.fullName = `${firstName || existingUser.firstName} ${lastName || existingUser.lastName}`;
    }

    if (password) {
      updateData.password = await AuthenticationHelper.hashString(password);
    }

    if (type) {
      const roles = await this.roleRepo.findAll({ name: type });
      if (roles.length === 0) throw new BadRequestError("roleManagement.roleNotFound");
      updateData.type = type as UserTypeEnum;
      updateData.roles = roles.map(role => role.id);
    }

    if (schoolSubdomain) {
      const organization = await this.schoolRepo.findOne({ subdomain: schoolSubdomain });
              if (!organization) throw new BadRequestError("notFound.school");
    }

    this.userRepo.switchConnection(schoolSubdomain || existingUser.schoolSubdomain);
    const updatedUser = await this.userRepo.findOneAndUpdate(
      { _id: userId },
      updateData
    );

    if (!updatedUser) throw new NotFoundError("notFound.user");

    return new SuccessResponse<UpdateUserResponse>("global.success", { user: updatedUser });
  }
}