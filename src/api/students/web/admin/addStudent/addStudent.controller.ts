import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessCreateResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddStudentUseCase } from "../../../../../feature/students/useCases/AddStudent.usecase";
import { AddStudentResponse, AddStudentRouteConfig } from "./addStudent.types";

@Controller()
export class AddStudentController extends BaseController<AddStudentRouteConfig> {
  constructor(@inject("AddStudentUseCase") private addStudentUseCase: AddStudentUseCase) {
    super();
  }

  async main(req: TypedRequest<AddStudentRouteConfig>): Promise<void | APIResponse> {
    let avatar: FileUploadPayload | null = null;
    if (req.files?.avatar) {
      const { buffer, originalname: name, mimetype } = req.files.avatar[0];
      avatar = { buffer, name, mimetype };
    }

    await this.addStudentUseCase.execute({ ...req.body, avatar, roles: [] });

    return new SuccessCreateResponse<AddStudentResponse>("student.addedSuccessfully");
  }
}
