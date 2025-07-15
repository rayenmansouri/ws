import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DiplomaService } from "../../../../../feature/diploma/Diploma.service";
import { AddDiplomaResponse, AddDiplomaRouteConfig } from "./addDiploma.types";

@Controller()
export class AddDiplomaController extends BaseController<AddDiplomaRouteConfig> {
  constructor(@inject("DiplomaService") private diplomaService: DiplomaService) {
    super();
  }

  async main(req: TypedRequest<AddDiplomaRouteConfig>): Promise<void | APIResponse> {
    const diploma = await this.diplomaService.addDiploma(req.body);
    return new SuccessResponse<AddDiplomaResponse>("diploma.addedSuccessfully", diploma);
  }
}
