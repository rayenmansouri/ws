import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListClassroomsUseCase } from "../../../../../feature/classrooms/useCases/ListClassrooms.usecase";
import { ListClassroomsResponse, ListClassroomsRouteConfig } from "./listClassrooms.types";

@Controller()
export class ListClassroomsController extends BaseController<ListClassroomsRouteConfig> {
  constructor(
    @inject("ListClassroomsUseCase") private listClassroomsUseCase: ListClassroomsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListClassroomsRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listClassroomsUseCase.execute(
      {
        name: req.query.search,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListClassroomsResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
