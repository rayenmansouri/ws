import { END_USER_ENUM, TEndAdministrationUserEnums } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateChapterAttachmentUseCase } from "../../../../../feature/lms/useCases/UpdateChapterAttachment.usecase";
import {
  UpdateChapterAttachmentRouteConfig,
  UpdateChapterAttachmentResponse,
} from "./updateChapterAttachment.types";

@Controller()
export class UpdateChapterAttachmentController extends BaseController<UpdateChapterAttachmentRouteConfig> {
  constructor(
    @inject("UpdateChapterAttachmentUseCase")
    private updateChapterAttachmentUseCase: UpdateChapterAttachmentUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateChapterAttachmentRouteConfig>): Promise<void | APIResponse> {
    const { chapterAttachmentNewId } = req.params;
    const {
      name,
      description,
      teacherNewId,
      status,
      classTypes: classTypeNewIds,
      subSubjectTypes: subSubjectTypeNewIds,
      subjectTypes: subjectTypeNewIds,
    } = req.body;

    const files = req.files?.files;
    const response = await this.updateChapterAttachmentUseCase.execute({
      chapterAttachmentNewId,
      name,
      description,
      teacherNewId: req.userType === END_USER_ENUM.TEACHER ? undefined : teacherNewId,
      files: files?.map(file => ({ ...file, name: file.originalname })),
      status,
      classTypeNewIds,
      subSubjectTypeNewIds,
      subjectTypeNewIds,
      userType: req.userType as TEndAdministrationUserEnums,
      userId: req.user._id,
      tenantId: req.tenantId,
    });
    return new SuccessResponse<UpdateChapterAttachmentResponse>("global.success", response);
  }
}
