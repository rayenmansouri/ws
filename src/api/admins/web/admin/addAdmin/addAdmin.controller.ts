import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddAdminUseCase } from "../../../../../feature/admins/useCases/AddAdmin.usecase";
import { AddAdminResponse, AddAdminRouteConfig } from "./addAdmin.types";

@Controller()
export class AddAdminController extends BaseController<AddAdminRouteConfig> {
  constructor(@inject("AddAdminUseCase") private addAdminUseCase: AddAdminUseCase) {
    super();
  }

  async main(req: TypedRequest<AddAdminRouteConfig>): Promise<void | APIResponse> {
    let avatar: FileUploadPayload | null = null;
    if (req.files?.avatar && req.files?.avatar[0]) {
      const { buffer, originalname, mimetype } = req.files?.avatar[0];
      avatar = { buffer, name: originalname, mimetype };
    }

    await this.addAdminUseCase.execute({
      ...req.body,
      avatar,
      isImpersonation: false,
    });

    return new SuccessResponse<AddAdminResponse>("admin.addedSuccessfully");
  }
}
