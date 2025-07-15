import {
  UpdateBankTransferUseCase,
  UpdateBankTransferRequestDto,
} from "../../../../../feature/invoices/useCases/updateBankTransfer.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  UpdateBankTransferRouteConfig,
  UpdateBankTransferResponse,
} from "./updateBankTransfer.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class UpdateBankTransferController extends BaseController<UpdateBankTransferRouteConfig> {
  constructor(
    @inject("UpdateBankTransferUseCase")
    private readonly updateBankTransferUseCase: UpdateBankTransferUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateBankTransferRouteConfig>): Promise<void | APIResponse> {
    const dto: UpdateBankTransferRequestDto = {
      bankTransferNewId: req.params.bankTransferNewId,
      fullName: req.body.fullName,
      bankName: req.body.bankName,
      transactionReference: req.body.transactionReference,
    };
    await this.updateBankTransferUseCase.execute(dto);
    return new SuccessResponse<UpdateBankTransferResponse>("global.success");
  }
}
