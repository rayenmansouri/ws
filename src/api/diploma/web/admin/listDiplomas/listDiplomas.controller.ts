import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DiplomaRepo } from "../../../../../feature/diploma/Diploma.repo";
import { ListDiplomasResponse, ListDiplomasRouteConfig } from "./listDiplomas.types";

@Controller()
export class ListDiplomasController extends BaseController<ListDiplomasRouteConfig> {
  constructor(@inject("DiplomaRepo") private diplomaRepo: DiplomaRepo) {
    super();
  }
  async main(req: TypedRequest<ListDiplomasRouteConfig>): Promise<APIResponse> {
    const diplomas = await this.diplomaRepo.listDiplomas(
      {
        search: req.query.search,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );
    return new SuccessResponse<ListDiplomasResponse>("global.success", diplomas);
  }
}
