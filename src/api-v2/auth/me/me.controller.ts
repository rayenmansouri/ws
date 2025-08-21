import { BaseController } from "../../../core/express/controllers/BaseController";
import { APIResponse } from "../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { MeResponse, MeRouteConfig } from "./me.types";
import { TypedRequest } from "../../../core/express/types";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { UserRepository } from "../../../feature/user-management/base-user/domain/base-user.repository";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../../feature/user-management/constants";
import { inject } from "../../../core/container/TypedContainer";

@Injectable({
  identifier: "MeController",
})
export class MeController extends BaseController<MeRouteConfig> {
  constructor(
    @inject(BASE_USER_REPOSITORY_IDENTIFIER) private baseUserRepository:UserRepository,
  ) {
    super();
  }

  async main(req: TypedRequest): Promise<void | APIResponse> {
    const user = req.currentUser;
    if (!user) {
      throw new Error("User not found in request");
    }
    const baseUser = await this.baseUserRepository.findOne({_id:user.id});
    if(!baseUser){
      throw new Error("User not found in database");
    }
    return new SuccessResponse<MeResponse>("global.success", { user: baseUser.toJSON() });
  }
}
