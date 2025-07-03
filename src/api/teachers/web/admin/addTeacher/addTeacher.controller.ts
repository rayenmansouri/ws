import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessCreateResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddTeacherUseCase } from "../../../../../feature/teachers/useCases/AddTeacher.usecase";
import { AddTeacherResponse, AddTeacherRouteConfig } from "./addTeacher.types";

@Controller()
export class AddTeacherController extends BaseController<AddTeacherRouteConfig> {
  constructor(@inject("AddTeacherUseCase") private addTeacherUseCase: AddTeacherUseCase) {
    super();
  }

  async main(req: TypedRequest<AddTeacherRouteConfig>): Promise<void | APIResponse> {
    let avatar: FileUploadPayload | null = null;
    if (req.files?.avatar) {
      const avatarFile = req.files.avatar[0];
      avatar = {
        buffer: avatarFile.buffer,
        mimetype: avatarFile.mimetype,
        name: avatarFile.originalname,
      };
    }

    await this.addTeacherUseCase.execute({
      ...req.body,
      avatar,
      levels: req.body.levels,
      subjectTypes: req.body.subjectTypes,
      groupTypes: req.body.groupTypes,
      roles: req.body.roles || [],
    });

    return new SuccessCreateResponse<AddTeacherResponse>("teacher.addedSuccessfully");
  }
}
