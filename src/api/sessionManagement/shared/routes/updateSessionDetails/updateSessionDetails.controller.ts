import {
  UpdateSessionDetailsUseCase,
  UpdateSessionDetailsRequestDTO,
} from "../../../../../feature/sessionManagement/useCases/updateSessionDetails.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  UpdateSessionDetailsRouteConfig,
  UpdateSessionDetailsResponse,
} from "./updateSessionDetails.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";

@Controller()
export class UpdateSessionDetailsController extends BaseController<UpdateSessionDetailsRouteConfig> {
  constructor(
    @inject("UpdateSessionDetailsUseCase")
    private readonly updateSessionDetailsUseCase: UpdateSessionDetailsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSessionDetailsRouteConfig>): Promise<void | APIResponse> {
    let filesToUpload: FileUploadPayload[] = [];

    if (req.files?.attachments) {
      filesToUpload = req.files.attachments.map(file => ({
        buffer: file.buffer,
        mimetype: file.mimetype,
        name: file.originalname,
      }));
    }
    const dto: UpdateSessionDetailsRequestDTO = {
      sessionNewId: req.params.sessionNewId,
      tenantId: req.tenantId,
      notes: req.body.notes,
      sessionSummary: req.body.sessionSummary,
      user: req.user,
      userType: req.userType as "teacher" | "admin",
      deletedAttachments: req.body.deletedAttachments || [],
      files: filesToUpload,
    };

    const response = await this.updateSessionDetailsUseCase.execute(dto);

    return new SuccessResponse<UpdateSessionDetailsResponse>("global.success", response);
  }
}
