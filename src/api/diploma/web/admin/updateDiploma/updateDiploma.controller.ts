import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DiplomaService } from "../../../../../feature/diploma/Diploma.service";
import { UpdateDiplomaRouteConfig, UpdateDiplomaResponse } from "./updateDiploma.types";

@Controller()
export class UpdateDiplomaController extends BaseController<UpdateDiplomaRouteConfig> {
  constructor(@inject("DiplomaService") private diplomaService: DiplomaService) {
    super();
  }

  async main(req: TypedRequest<UpdateDiplomaRouteConfig>): Promise<void | APIResponse> {
    const { diplomaNewId } = req.params;

    const diploma = await this.diplomaService.updateDiploma(diplomaNewId, req.body);
    return new SuccessResponse<UpdateDiplomaResponse>("diploma.updateSuccessfully", diploma);
  }
}
