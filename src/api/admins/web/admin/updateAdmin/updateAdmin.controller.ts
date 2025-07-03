import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateAdminUseCase } from "../../../../../feature/admins/useCases/UpdateAdmin.usecase";
import { UpdateAdminRouteConfig, UpdateAdminResponse } from "./updateAdmin.types";

@Controller()
export class UpdateAdminController extends BaseController<UpdateAdminRouteConfig> {
  constructor(@inject("UpdateAdminUseCase") private updateAdminUseCase: UpdateAdminUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateAdminRouteConfig>): Promise<void | APIResponse> {
    let avatar: FileUploadPayload | null = null;
    if (req.files?.avatar) {
      const { buffer, originalname: name, mimetype } = req.files.avatar[0];
      avatar = { buffer, name, mimetype };
    }

    await this.updateAdminUseCase.execute(req.params.adminNewId, {
      ...req.body,
      avatar,
    });

    return new SuccessResponse<UpdateAdminResponse>("admin.updatedSuccessfully");
  }
}
