import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  SendReplyUseCase,
  sendReplyUseCaseRequestDto,
} from "../../../../../feature/issues/usecases/SendReply.usecase";
import { InternalError } from "./../../../../../core/ApplicationErrors";
import { FileUploadPayload } from "./../../../../../core/fileManager/FileManager";
import { BaseUser } from "./../../../../../feature/users/domain/baseUser.entity";
import { SendReplyResponse, SendReplyRouteConfig } from "./sendReply.types";

@Controller()
export class SendReplyController extends BaseController<SendReplyRouteConfig> {
  constructor(@inject("SendReplyUseCase") private usecase: SendReplyUseCase) {
    super();
  }

  async main(req: TypedRequest<SendReplyRouteConfig>): Promise<void | APIResponse> {
    let filesToUpload: FileUploadPayload[] = [];

    if (req.userType === "student" || req.userType === "master" || !req.userType)
      throw new InternalError("user type not allowed for this api end point");

    if (req.files?.attachments) {
      filesToUpload = req.files.attachments.map(file => ({
        buffer: file.buffer,
        mimetype: file.mimetype,
        name: file.originalname,
      }));
    }
    const dto: sendReplyUseCaseRequestDto = {
      text: req.body.text,
      files: filesToUpload,
      issueNewId: req.params.issueNewId,
      userType: req.userType,
      user: req.user as unknown as BaseUser,
      tenantId: req.tenantId,
    };
    const data = await this.usecase.execute(dto);
    return new SuccessResponse<SendReplyResponse>("global.success", data);
  }
}
