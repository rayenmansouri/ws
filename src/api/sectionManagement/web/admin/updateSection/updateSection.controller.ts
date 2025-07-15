import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSectionUseCase } from "../../../../../feature/sections/useCases/UpdateSection.usecase";
import { UpdateSectionRouteConfig, UpdateSectionResponse } from "./updateSection.types";

@Controller()
export class UpdateSectionController extends BaseController<UpdateSectionRouteConfig> {
  constructor(@inject("UpdateSectionUseCase") private updateSectionUseCase: UpdateSectionUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateSectionRouteConfig>): Promise<void | APIResponse> {
    await this.updateSectionUseCase.execute(req.params.sectionNewId, req.body);
    return new SuccessResponse<UpdateSectionResponse>("section.updatedSuccessfully");
  }
}
