import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateStudentUseCase } from "../../../../../feature/students/useCases/UpdateStudent.usecase";
import { UpdateStudentRouteConfig, UpdateStudentResponse } from "./updateStudent.types";

@Controller()
export class UpdateStudentController extends BaseController<UpdateStudentRouteConfig> {
  constructor(@inject("UpdateStudentUseCase") private updateStudentUseCase: UpdateStudentUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateStudentRouteConfig>): Promise<void | APIResponse> {
    let avatar: FileUploadPayload | null = null;
    if (req.files?.avatar) {
      const { buffer, originalname: name, mimetype } = req.files.avatar[0];
      avatar = { buffer, name, mimetype };
    }

    await this.updateStudentUseCase.execute(req.params.studentNewId, {
      ...req.body,
      avatar,
    });

    return new SuccessResponse<UpdateStudentResponse>("student.updatedSuccessfully");
  }
}
