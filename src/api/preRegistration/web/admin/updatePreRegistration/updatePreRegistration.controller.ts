import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdatePreRegistrationUseCase } from "../../../../../feature/preRegistration/useCases/UpdatePreRegistration.usecase";
import {
  UpdatePreRegistrationRouteConfig,
  UpdatePreRegistrationResponse,
} from "./updatePreRegistration.types";

@Controller()
export class UpdatePreRegistrationController extends BaseController<UpdatePreRegistrationRouteConfig> {
  constructor(
    @inject("UpdatePreRegistrationUseCase")
    private updatePreRegistrationUseCase: UpdatePreRegistrationUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdatePreRegistrationRouteConfig>): Promise<void | APIResponse> {
    const { body, files } = req;

    const birthCertificateFiles: FileUploadPayload[] | null =
      files?.birthCertificate?.map(file => ({
        name: file.originalname,
        mimetype: file.mimetype,
        buffer: file.buffer,
      })) || null;

    const previousTranscriptsFiles: FileUploadPayload[] | null =
      files?.previousTranscripts?.map(file => ({
        name: file.originalname,
        mimetype: file.mimetype,
        buffer: file.buffer,
      })) || null;

    const payload = { ...body, birthCertificateFiles, previousTranscriptsFiles };

    await this.updatePreRegistrationUseCase.execute(req.params.preRegistrationId, payload);

    return new SuccessResponse<UpdatePreRegistrationResponse>("global.success");
  }
}
