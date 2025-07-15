import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { SectionRepo } from "../../../../../feature/sections/repos/Section.repo";
import { AddSectionUseCase } from "../../../../../feature/sections/useCases/AddSection.usecase";
import { AddSectionRouteConfig, AddSectionResponse } from "./addSection.types";

@Controller()
export class AddSectionController extends BaseController<AddSectionRouteConfig> {
  constructor(@inject("AddSectionUseCase") private addSectionUseCase: AddSectionUseCase) {
    super();
  }

  async main(req: TypedRequest<AddSectionRouteConfig>): Promise<void | APIResponse> {
    const response = await this.addSectionUseCase.execute(req.body);
    return new SuccessResponse<AddSectionResponse>("section.createdSuccessfully", response);
  }
}
