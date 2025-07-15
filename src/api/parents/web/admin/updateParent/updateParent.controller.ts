import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateParentUseCase } from "../../../../../feature/parents/useCases/UpdateParent.usecase";
import { UpdateParentRouteConfig, UpdateParentResponse } from "./updateParent.types";

@Controller()
export class UpdateParentController extends BaseController<UpdateParentRouteConfig> {
  constructor(@inject("UpdateParentUseCase") private updateParentUseCase: UpdateParentUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateParentRouteConfig>): Promise<void | APIResponse> {
    let avatar: FileUploadPayload | null = null;
    if (req.files?.avatar) {
      const { buffer, originalname: name, mimetype } = req.files.avatar[0];
      avatar = { buffer, name, mimetype };
    }

    await this.updateParentUseCase.execute(req.params.parentNewId, {
      ...req.body,
      avatar,
    });

    return new SuccessResponse<UpdateParentResponse>("parent.updatedSuccessfully");
  }
}
