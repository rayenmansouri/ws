import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetGroupListUseCase,
  getGroupListRequestDto,
} from "../../../../../feature/groupManagement/useCases/GetGroupList.usecase";
import { GetGroupListRouteConfig, GetGroupListResponse } from "./getGroupList.types";

@Controller()
export class GetGroupListController extends BaseController<GetGroupListRouteConfig> {
  constructor(@inject("GetGroupListUseCase") private getGroupListUseCase: GetGroupListUseCase) {
    super();
  }

  async main(req: TypedRequest<GetGroupListRouteConfig>): Promise<void | APIResponse> {
    const dto: getGroupListRequestDto = {
      groupTypeNewId: req.query.groupTypeNewId,
      schoolYearId: req.query.schoolYearId,
    };
    const result = await this.getGroupListUseCase.execute(dto);

    return new SuccessResponse<GetGroupListResponse>("global.success", result);
  }
}
