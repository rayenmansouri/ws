import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddClassUseCase } from "../../../../../feature/classes/useCases/AddClass.usecase";
import { ID } from "../../../../../types/BaseEntity";
import { AddClassRouteConfig, AddClassResponse } from "./addClass.types";

@Controller()
export class AddClassController extends BaseController<AddClassRouteConfig> {
  constructor(@inject("AddClassUseCase") private addClassUseCase: AddClassUseCase) {
    super();
  }

  async main(req: TypedRequest<AddClassRouteConfig>): Promise<void | APIResponse> {
    const response = await this.addClassUseCase.execute({
      ...req.body,
      studentIds: req.body.students || [],
      subjectTeacherRecords: req.body.subjectTeachers as Record<ID, ID>,
      subSubjectTeacherRecords: req.body.subSubjectTeachers as Record<ID, ID>,
    });
    return new SuccessResponse<AddClassResponse>("global.success", response);
  }
}
