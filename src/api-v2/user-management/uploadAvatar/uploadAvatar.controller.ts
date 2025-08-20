import { inject } from "../../../core/container/TypedContainer";
import { BaseController } from "../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../core/express/types";
import { FileUploadPayload, LocallyUploadedFile } from "../../../core/fileManager/FileManager";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { APIResponse } from "../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { UploadAvatarUseCase } from "../../../feature/user-management/useCases/UploadAvatar.usecase";
import { UploadAvatarResponse, UploadAvatarRouteConfig } from "./uploadAvatar.types";
import { UserTypeEnum } from "../../../feature/user-management/factory/enums";
import { UPLOAD_AVATAR_USECASE_IDENTIFIER, UPLOAD_AVATAR_CONTROLLER_IDENTIFIER } from "../../../feature/user-management/constants";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";

@Injectable({
  identifier: UPLOAD_AVATAR_CONTROLLER_IDENTIFIER
})
export class UploadAvatarController extends BaseController<UploadAvatarRouteConfig> {
  constructor(@inject(UPLOAD_AVATAR_USECASE_IDENTIFIER) private uploadAvatarUseCase: UploadAvatarUseCase) {
    super();
  }

  async main(req: TypedRequest<UploadAvatarRouteConfig>): Promise<void | APIResponse> {
    const avatarFile = req.files?.avatar?.[0];

    if (!avatarFile) {
      throw new BadRequestError("Avatar file is required");
    }

    const formatFile: LocallyUploadedFile = {
      mimetype: avatarFile.mimetype,
      buffer: avatarFile.buffer,
      name: avatarFile.originalname,
      path: avatarFile.path,
    };

    const res = await this.uploadAvatarUseCase.execute({
      file: formatFile,
      userId: req.currentUser.id,
      userType: req.currentUser.type as UserTypeEnum,
    });

    return new SuccessResponse<UploadAvatarResponse>("Avatar uploaded successfully", res);
  }
}
