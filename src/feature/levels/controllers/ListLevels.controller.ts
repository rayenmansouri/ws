import { inject, injectable } from "inversify";
import { BaseController } from "../../../core/BaseController";
import { TypedRequest } from "../../../core/express/types";
import { APIResponse } from "../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { ListLevelsUseCase, ListLevelsRequest } from "../useCases/ListLevels.usecase";
import { ListLevelsValidation } from "./ListLevels.validation";

@injectable()
export class ListLevelsController extends BaseController<ListLevelsValidation> {
  constructor(@inject("ListLevelsUseCase") private listLevelsUseCase: ListLevelsUseCase) {
    super();
  }

  async main(req: TypedRequest<ListLevelsValidation>): Promise<APIResponse> {
    const request: ListLevelsRequest = {
      search: req.query.search,
      limit: req.query.limit,
      page: req.query.page,
    };

    const levels = await this.listLevelsUseCase.execute(request);

    return new SuccessResponse("global.listSuccessfullyRetrieved", levels);
  }
}
