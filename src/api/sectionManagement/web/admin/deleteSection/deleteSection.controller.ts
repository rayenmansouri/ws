import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteSectionUseCase } from "../../../../../feature/sections/useCases/DeleteSection.usecase";
import { DeleteSectionRouteConfig, DeleteSectionResponse } from "./deleteSection.types";

@Controller()
export class DeleteSectionController extends BaseController<DeleteSectionRouteConfig> {
  constructor(@inject("DeleteSectionUseCase") private deleteSectionUseCase: DeleteSectionUseCase) {
    super();
  }

  async main(req: TypedRequest<DeleteSectionRouteConfig>): Promise<void | APIResponse> {
    await this.deleteSectionUseCase.execute(req.params.sectionNewId);
    return new SuccessResponse<DeleteSectionResponse>("section.deletedSuccessfully");
  }
}
