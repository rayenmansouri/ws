import { Controller } from "../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../core/express/controllers/BaseController";
import { TypedRequest } from "../../core/express/types";
import { APIResponse } from "../../core/responseAPI/APIResponse";
import { CreateUserRouteConfig } from "./createUser.types";

@Controller()
export class CreateUserController extends BaseController<CreateUserRouteConfig> {
  constructor() {
    super();
  }

  async main(req: TypedRequest<CreateUserRouteConfig>): Promise<void | APIResponse> {
    // TODO: Implement create user use case
  }
}