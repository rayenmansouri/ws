import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";
import { BadRequestError } from "../../../../../core/ApplicationErrors";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UploadAvatarUseCase } from "../../../../../feature/users/useCases/UploadAvatar.usecase";
import { UploadAvatarResponse, UploadAvatarRouteConfig } from "./uploadAvatar.types";

@Controller()
export class UploadAvatarController extends BaseController<UploadAvatarRouteConfig> {
  constructor(@inject("UploadAvatarUseCase") private uploadAvatarUseCase: UploadAvatarUseCase) {
    super();
  }

  async main(req: TypedRequest<UploadAvatarRouteConfig>): Promise<void | APIResponse> {
    const avatarFile = req.files?.avatar?.[0];

    if (!avatarFile) throw new BadRequestError("missing.avatar");

    const formatFile: FileUploadPayload = {
      mimetype: avatarFile.mimetype,
      buffer: avatarFile.buffer,
      name: avatarFile.originalname,
    };

    await this.uploadAvatarUseCase.execute({
      file: formatFile,
      userId: req.user._id,
      userType: req.userType!,
    });

    return new SuccessResponse<UploadAvatarResponse>("user.avatarUploadedSuccessfully");
  }
}
