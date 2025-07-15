import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteSignatureUseCase } from "../../../../../feature/signatures/useCases/DeleteSignature.usecase";
import { DeleteSignatureRouteConfig, DeleteSignatureResponse } from "./deleteSignature.types";

@Controller()
export class DeleteSignatureController extends BaseController<DeleteSignatureRouteConfig> {
  constructor(
    @inject("DeleteSignatureUseCase") private deleteSignatureUseCase: DeleteSignatureUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteSignatureRouteConfig>): Promise<void | APIResponse> {
    await this.deleteSignatureUseCase.execute(req.params.signatureNewId);

    return new SuccessResponse<DeleteSignatureResponse>("signatures.deletedSuccessfully");
  }
}
