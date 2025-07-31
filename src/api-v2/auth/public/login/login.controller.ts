import { Controller } from "../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../core/container/TypedContainer";
import { BaseController } from "../../../../core/express/controllers/BaseController";
import { APIResponse } from "../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../core/responseAPI/APISuccessResponse";
import { UserRepository } from "../../../../feature/user-management/base-user/domain/base-user.repository";

import {  LoginResponse, LoginRouteConfig } from "./login.types";
import { TypedRequest } from "../../../../core/express/types";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { AuthenticationHelper } from "../../../../core/auth.helper";

@Controller()
export class LoginController extends BaseController<LoginRouteConfig> {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository,

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
        const tenantId = user.isMaster() == false ? user.tenantId : "MASTER_DATABASE"
        const token = AuthenticationHelper.generateUserToken(user.id, tenantId);
        return new SuccessResponse<LoginResponse>("global.success", {token,user:user.toJSON()});
  }
} 