import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  AddIssueUseCase,
  addIssueRequestDto,
} from "../../../../../feature/issues/usecases/addIssue.usecase";
import { FileUploadPayload } from "./../../../../../core/fileManager/FileManager";
import { Parent } from "./../../../../../feature/parents/domain/parent.entity";
import { AddIssueResponse, AddIssueRouteConfig } from "./addIssue.types";

@Controller()
export class AddIssueController extends BaseController<AddIssueRouteConfig> {
  constructor(@inject("AddIssueUseCase") private readonly usecase: AddIssueUseCase) {
    super();
  }

  async main(req: TypedRequest<AddIssueRouteConfig>): Promise<void | APIResponse> {
    const attachments: FileUploadPayload[] =
      req.files?.attachments?.map(file => {
        return {
          name: file.originalname,
          mimetype: file.mimetype,
          buffer: file.buffer,
        };
      }) || [];

    const dto: addIssueRequestDto = {
      teacherId: req.body.teacherId,
      studentNewId: req.body.studentNewId,
      parent: req.user as unknown as Parent,
      issueReasonId: req.body.issueReasonId,
      attachments,
      tenantId: req.tenantId,
      content: req.body.content,
      targetType: req.body.targetType,
    };

    const data = await this.usecase.execute(dto);
    return new SuccessResponse<AddIssueResponse>("global.success", data);
  }
}
