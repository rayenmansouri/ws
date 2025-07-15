import { BadRequestError } from "../../../../../core/ApplicationErrors";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddSignatureUseCase } from "../../../../../feature/signatures/useCases/AddSignature.usecase";
import { AddSignatureRouteConfig, AddSignatureResponse } from "./addSignature.types";

@Controller()
export class AddSignatureController extends BaseController<AddSignatureRouteConfig> {
  constructor(@inject("AddSignatureUseCase") private addSignatureUseCase: AddSignatureUseCase) {
    super();
  }

  async main(req: TypedRequest<AddSignatureRouteConfig>): Promise<void | APIResponse> {
    if (!req.files?.image) throw new BadRequestError("global.badRequest");

    const image: FileUploadPayload = {
      buffer: req.files.image[0].buffer,
      name: req.files.image[0].originalname,
      mimetype: req.files.image[0].mimetype,
    };

    await this.addSignatureUseCase.execute({
      ...req.body,
      image,
      personName: req.body.personName ?? null,
    });

    return new SuccessResponse<AddSignatureResponse>("signatures.addedSuccessfully");
  }
}
