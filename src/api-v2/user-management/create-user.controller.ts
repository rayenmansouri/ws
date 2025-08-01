import { Controller } from "../../core/container/decorators/Controller.decorator";
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

@Injectable({
  identifier: "CreateUserController",
})
export class CreateUserController extends BaseController<CreateUserRouteConfig> {
  constructor(
    @inject(BASE_USER_REPOSITORY_IDENTIFIER) private userRepo: UserRepository,
  ) {
    super();
  }

  async main(req: TypedRequest<CreateUserRouteConfig>): Promise<void | APIResponse> {
    const { firstName, lastName, email, password, schoolSubdomain, type } = req.body;
    const user = await this.userRepo.create({
      firstName,
      lastName, 
      fullName: `${firstName} ${lastName}`,
      email,
      password,
      schoolSubdomain,
      type: type as UserTypeEnum,
      roles: []
    });
    this.userRepo.switchConnection(schoolSubdomain);
    await this.userRepo.create({
      firstName,
      lastName, 
      fullName: `${firstName} ${lastName}`,
      email,
      password,
      schoolSubdomain,
      type: type as UserTypeEnum,
      roles: []
    });
    return new SuccessResponse<CreateUserResponse>("global.success", { user });
  }
}