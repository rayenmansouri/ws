import { TEndUserEnum } from "./../../../../../constants/globalEnums";
import { FindUsersByFullNameUseCase } from "./../../../../../feature/messages/useCases/ListTargetUsers.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetMessageTargetUsersRouteConfig,
  GetMessageTargetUsersResponse,
} from "./getMessageTargetUsers.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class GetMessageTargetUsersController extends BaseController<GetMessageTargetUsersRouteConfig> {
  constructor(
    @inject("FindUsersByFullNameUseCase")
    private readonly findUsersByFullNameUseCase: FindUsersByFullNameUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetMessageTargetUsersRouteConfig>): Promise<void | APIResponse> {
    const response = await this.findUsersByFullNameUseCase.execute(
      req.query.fullName,
      req.userType as TEndUserEnum,
    );
    return new SuccessResponse<GetMessageTargetUsersResponse>("global.success", response);
  }
}
