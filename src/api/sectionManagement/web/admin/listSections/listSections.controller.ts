import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { SectionRepo } from "../../../../../feature/sections/repos/Section.repo";
import { ListSectionsUseCase } from "../../../../../feature/sections/useCases/ListSections.usecase";
import { ListSectionsRouteConfig, ListSectionsResponse } from "./listSections.types";

@Controller()
export class ListSectionsController extends BaseController<ListSectionsRouteConfig> {
  constructor(@inject("ListSectionsUseCase") private listSectionsUseCase: ListSectionsUseCase) {
    super();
  }

  async main(req: TypedRequest<ListSectionsRouteConfig>): Promise<void | APIResponse> {
    const sections = await this.listSectionsUseCase.execute({
      search: req.query.search,
      page: req.query.page,
      limit: req.query.limit,
    });
    return new SuccessResponse<ListSectionsResponse>("global.success", sections);
  }
}
