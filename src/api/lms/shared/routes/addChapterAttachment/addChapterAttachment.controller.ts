import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { BadRequestError } from "../../../../../core/ApplicationErrors";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddChapterAttachmentUseCase } from "../../../../../feature/lms/useCases/AddChapterAttachment.usecase";
import {
  AddChapterAttachmentRouteConfig,
  AddChapterAttachmentResponse,
} from "./addChapterAttachment.types";

@Controller()
export class AddChapterAttachmentController extends BaseController<AddChapterAttachmentRouteConfig> {
  constructor(
    @inject("AddChapterAttachmentUseCase")
    private addChapterAttachmentUseCase: AddChapterAttachmentUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddChapterAttachmentRouteConfig>): Promise<void | APIResponse> {
    const files = req.files?.files;
    if (!files || files?.length === 0) throw new BadRequestError("File is required");
    const response = await this.addChapterAttachmentUseCase.execute({
      ...req.body,
      files: files.map(file => ({ ...file, name: file.originalname })),
      teacherNewId: req.userType === END_USER_ENUM.TEACHER ? req.user.newId : req.body.teacherNewId,
      tenantId: req.tenantId,
      description: req.body.description || undefined,
    });

    return new SuccessResponse<AddChapterAttachmentResponse>("global.success", response);
  }
}
