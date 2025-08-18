import { Injectable } from "../../../../../core/container/decorators/AutoRegister.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListLevelsRouteConfig, ListLevelsResponse } from "./listLevels.types";

@Injectable({ identifier: "ListLevelsController" })
export class ListLevelsController extends BaseController<ListLevelsRouteConfig> {
  async main(req: TypedRequest<ListLevelsRouteConfig>): Promise<void | APIResponse> {
    // TODO: Implement the logic for listing levels
    // For now, returning a mock response
    const mockLevels: ListLevelsResponse = {
      data: [],
      pagination: {
        page: req.query.page ?? 1,
        limit: req.query.limit ?? 10,
        total: 0,
        totalPages: 0,
      },
    };

    return new SuccessResponse<ListLevelsResponse>("global.listSuccessfullyRetrieved", mockLevels);
  }
}
