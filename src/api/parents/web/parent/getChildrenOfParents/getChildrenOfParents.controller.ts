import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetChildrenOfParentUseCase } from "../../../../../feature/parents/useCases/GetChildrenOfParent.usecase";
import {
  GetChildrenOfParentsRouteConfig,
  GetChildrenOfParentsResponse,
} from "./getChildrenOfParents.types";

@Controller()
export class GetChildrenOfParentsController extends BaseController<GetChildrenOfParentsRouteConfig> {
  constructor(
    @inject("GetChildrenOfParentUseCase")
    private getChildrenOfParentUseCase: GetChildrenOfParentUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetChildrenOfParentsRouteConfig>): Promise<void | APIResponse> {
    const children = await this.getChildrenOfParentUseCase.execute(req.user.newId);

    return new SuccessResponse<GetChildrenOfParentsResponse>("global.success", children);
  }
}
