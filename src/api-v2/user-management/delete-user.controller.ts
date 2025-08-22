import { BaseController } from "../../core/express/controllers/BaseController";
import { TypedRequest } from "../../core/express/types";
import { APIResponse } from "../../core/responseAPI/APIResponse";
import { DeleteUserResponse, DeleteUserRouteConfig } from "./delete-user.types";
import { UserRepository } from "../../feature/user-management/base-user/domain/base-user.repository";
import { SuccessResponse } from "../../core/responseAPI/APISuccessResponse";
import { inject } from "../../core/container/TypedContainer";
import { Injectable } from "../../core/container/decorators/AutoRegister.decorator";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../feature/user-management/constants";
import { NotFoundError } from "../../core/ApplicationErrors";

@Injectable({
  identifier: "DeleteUserController",
})
export class DeleteUserController extends BaseController<DeleteUserRouteConfig> {
  constructor(
    @inject(BASE_USER_REPOSITORY_IDENTIFIER) private userRepo: UserRepository,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteUserRouteConfig>): Promise<void | APIResponse> {
    const { userId } = req.params;

    const existingUser = await this.userRepo.findOne({ _id: userId });
    if (!existingUser) throw new NotFoundError("notFound.user");

    this.userRepo.switchConnection(existingUser.schoolSubdomain);
    const deletedUser = await this.userRepo.findOneAndDelete({ _id: userId });

    if (!deletedUser) throw new NotFoundError("notFound.user");

    return new SuccessResponse<DeleteUserResponse>("global.success", { user: deletedUser });
  }
}