import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSignatureRouteConfig, UpdateSignatureResponse } from "./updateSignature.types";
import { UpdateSignatureUseCase } from "../../../../../feature/signatures/useCases/UpdateSignature.usecase";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class UpdateSignatureController extends BaseController<UpdateSignatureRouteConfig> {
  constructor(
    @inject("UpdateSignatureUseCase") private updateSignatureUseCase: UpdateSignatureUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSignatureRouteConfig>): Promise<void | APIResponse> {
    let image: FileUploadPayload | undefined = undefined;
    if (req.files?.image) {
      const { buffer, originalname: name, mimetype } = req.files.image[0];
      image = { buffer, name, mimetype };
    }

    await this.updateSignatureUseCase.execute(req.params.signatureNewId, { ...req.body, image });

    return new SuccessResponse<UpdateSignatureResponse>("");
  }
}
