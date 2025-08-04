import { inject } from "../../../../core/container/TypedContainer";
import { BaseController } from "../../../../core/express/controllers/BaseController";
import { APIResponse } from "../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../core/responseAPI/APISuccessResponse";
import { UserRepository } from "../../../../feature/user-management/base-user/domain/base-user.repository";

import {  LoginResponse, LoginRouteConfig } from "./login.types";
import { TypedRequest } from "../../../../core/express/types";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { AuthenticationHelper } from "../../../../core/auth.helper";
import { MASTER_USER_TENANT_ID } from "../../../../feature/user-management/master/domain/master.entity";
import { Injectable } from "../../../../core/container/decorators/AutoRegister.decorator";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../../../feature/user-management/constants";

@Injectable({
  identifier: "LoginController",
})
export class LoginController extends BaseController<LoginRouteConfig> {
  constructor(
    @inject(BASE_USER_REPOSITORY_IDENTIFIER) private userRepository: UserRepository,

  ) {
    super();
  }

   async main(req:TypedRequest): Promise<void | APIResponse> {
        const {credential,password} = req.body as {credential:string,password:string};
        const user = await this.userRepository.findOne({
            $or:[
                {email:credential},
                {phoneNumber:credential},
            ]
        });
        if(!user) throw new BadRequestError("global.userNotFound");
        const isPasswordValid = await AuthenticationHelper.checkStringHashMatch(
          password,
          user.password,
        );
        if(!isPasswordValid) throw new BadRequestError("global.invalidPassword");
        const schoolSubdomain = user.isMaster() == false ? user.schoolSubdomain : MASTER_USER_TENANT_ID;
        const token = AuthenticationHelper.generateUserToken(user.id, schoolSubdomain);
        return new SuccessResponse<LoginResponse>("global.success", {token,user:user.toJSON()});
  }
} 