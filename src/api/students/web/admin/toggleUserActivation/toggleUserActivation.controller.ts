import { ACTION_ENUM } from "../../../../../constants/ActionsResource";
import { ForbiddenError } from "../../../../../core/ApplicationErrors";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AuthorizationService } from "../../../../../feature/authorization/domain/Authorization.service";
import { ToggleUserActivationUseCase } from "../../../../../feature/students/useCases/ToggleUserActivation.usecase";
import {
  ToggleUserActivationRouteConfig,
  ToggleUserActivationResponse,
} from "./toggleUserActivation.types";

@Controller()
export class ToggleUserActivationController extends BaseController<ToggleUserActivationRouteConfig> {
  constructor(
    @inject("ToggleUserActivationUseCase")
    private toggleUserActivationUseCase: ToggleUserActivationUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ToggleUserActivationRouteConfig>): Promise<void | APIResponse> {
    const { userNewId, userType } = req.body;

    const userTypeUppercase = userType.toUpperCase() as Uppercase<typeof userType>;

    const isActionAllowed = AuthorizationService.isActionAllowed(
      req.user,
      ACTION_ENUM.ARCHIVE,
      userTypeUppercase,
    );

    if (!isActionAllowed) throw new ForbiddenError();

    const response = await this.toggleUserActivationUseCase.execute({
      userNewId,
      userType,
    });

    return new SuccessResponse<ToggleUserActivationResponse>("global.success", response);
  }
}
