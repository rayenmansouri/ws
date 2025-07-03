import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { LogoutResponse, LogoutRouteConfig } from "./logout.types";

@Controller()
export class LogoutController extends BaseController<LogoutRouteConfig> {
  constructor() {
    super();
  }

  async main(req: TypedRequest<LogoutRouteConfig>): Promise<void | APIResponse> {
    const userAgent = req.body.userAgent || req.headers["user-agent"];

    if (req.userType === END_USER_ENUM.MASTER)
      return new SuccessResponse<LogoutResponse>("global.success");

    if (!userAgent) return new SuccessResponse<LogoutResponse>("global.success");

    const logoutUseCase = req.container.get("LogoutUseCase");
    const response = await logoutUseCase.execute({
      userId: req.user._id,
      userAgent: req.body.userAgent || req.headers["user-agent"],
    });
    return new SuccessResponse<LogoutResponse>("global.success", response);
  }
}
