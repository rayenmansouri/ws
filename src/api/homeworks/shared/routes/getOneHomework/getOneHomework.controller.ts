import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetOneHomeworkUseCase } from "../../../../../feature/homeworks/useCases/GetOneHomework.usecase";
import { GetOneHomeworkRouteConfig, GetOneHomeworkResponse } from "./getOneHomework.types";

@Controller()
export class GetOneHomeworkController extends BaseController<GetOneHomeworkRouteConfig> {
  constructor(
    @inject("GetOneHomeworkUseCase") private getOneHomeworkUseCase: GetOneHomeworkUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetOneHomeworkRouteConfig>): Promise<void | APIResponse> {
    const userDetails = {
      user: req.user,
      type: req.userType as TEndUserEnum,
    };

    const response = await this.getOneHomeworkUseCase.execute(
      req.params.homeworkNewId,
      userDetails,
    );

    return new SuccessResponse<GetOneHomeworkResponse>("global.success", response);
  }
}
