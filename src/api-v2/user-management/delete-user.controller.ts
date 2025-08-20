import { BaseController } from "../../core/express/controllers/BaseController";
import { TypedRequest } from "../../core/express/types";
import { APIResponse } from "../../core/responseAPI/APIResponse";
import { DeleteUserResponse, DeleteUserRouteConfig } from "./deleteUser.types";
import { SuccessResponse } from "../../core/responseAPI/APISuccessResponse";
import { inject } from "../../core/container/TypedContainer";
import { Injectable } from "../../core/container/decorators/AutoRegister.decorator";
import { REPOSITORY_FACTORY_IDENTIFIER } from "../../feature/user-management/constants";
import { NotFoundError } from "../../core/ApplicationErrors";
import { RepositoryFactory } from "../../feature/user-management/factory/repository.factory";

@Injectable({
  identifier: "DeleteUserController",
})
export class DeleteUserController extends BaseController<DeleteUserRouteConfig> {
  constructor(
    @inject(REPOSITORY_FACTORY_IDENTIFIER) private repositoryFactory: RepositoryFactory,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteUserRouteConfig>): Promise<void | APIResponse> {
    const { id } = req.params;
    
    // First, get the user to determine type and check existence
    const userRepository = this.repositoryFactory.getRepository();
    const existingUser = await userRepository.findById(id);
    if (!existingUser) throw new NotFoundError("global.userNotFound");
    
    // Get the correct repository for the user type
    const typedUserRepository = this.repositoryFactory.getRepository(existingUser.type);
    
    // Delete from master database
    await typedUserRepository.deleteById(id);
    
    // Delete from tenant database
    typedUserRepository.switchConnection(existingUser.schoolSubdomain);
    await typedUserRepository.deleteById(id);
    
    return new SuccessResponse<DeleteUserResponse>("global.success", { message: "User deleted successfully" });
  }
}