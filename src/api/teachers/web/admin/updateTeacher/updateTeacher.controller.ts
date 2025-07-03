import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateTeacherUseCase } from "../../../../../feature/teachers/useCases/UpdateTeacher.usecase";
import { UpdateTeacherRouteConfig, UpdateTeacherResponse } from "./updateTeacher.types";

@Controller()
export class UpdateTeacherController extends BaseController<UpdateTeacherRouteConfig> {
  constructor(@inject("UpdateTeacherUseCase") private updateTeacherUseCase: UpdateTeacherUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateTeacherRouteConfig>): Promise<void | APIResponse> {
    let avatar: FileUploadPayload | null = null;
    if (req.files?.avatar) {
      const { buffer, originalname: name, mimetype } = req.files.avatar[0];
      avatar = { buffer, name, mimetype };
    }

    await this.updateTeacherUseCase.execute(req.params.teacherNewId, {
      ...req.body,
      avatar,
    });

    return new SuccessResponse<UpdateTeacherResponse>("teacher.updatedSuccessfully");
  }
}
