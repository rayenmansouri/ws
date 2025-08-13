import { BaseController } from "../../../core/express/controllers/BaseController";
import { APIResponse } from "../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { MeResponse, MeRouteConfig } from "./me.types";
import { TypedRequest } from "../../../core/express/types";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";

@Injectable({
  identifier: "MeController",
})
export class MeController extends BaseController<MeRouteConfig> {
  constructor() {
    super();
  }

  async main(req: TypedRequest): Promise<void | APIResponse> {
    const user = req.currentUser;
    if (!user) {
      throw new Error("User not found in request");
    }
    
    return new SuccessResponse<MeResponse>("global.success", { user: user.toJSON() });
  }
}
