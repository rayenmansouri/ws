import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DiplomaService } from "../../../../../feature/diploma/Diploma.service";
import { DeleteDiplomaRouteConfig, DeleteDiplomaResponse } from "./deleteDiploma.types";

@Controller()
export class DeleteDiplomaController extends BaseController<DeleteDiplomaRouteConfig> {
  constructor(@inject("DiplomaService") private diplomaService: DiplomaService) {
    super();
  }

  async main(req: TypedRequest<DeleteDiplomaRouteConfig>): Promise<void | APIResponse> {
    const { newIds } = req.body;
    await this.diplomaService.deleteDiplomas(newIds);
    return new SuccessResponse<DeleteDiplomaResponse>("global.success");
  }
}
