import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListClassesByTeacherUseCase } from "../../../../../feature/classes/useCases/ListClassesByTeacher.usecase";
import { Teacher } from "../../../../../feature/teachers/domain/teacher.entity";
import { ListClassesResponse, ListClassesRouteConfig } from "./listClasses.types";

@Controller()
export class ListClassesController extends BaseController<ListClassesRouteConfig> {
  constructor(
    @inject("ListClassesByTeacherUseCase")
    private listClassesByTeacherUseCase: ListClassesByTeacherUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListClassesRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listClassesByTeacherUseCase.execute(
      req.query,
      req.user as unknown as Teacher,
    );
    return new SuccessResponse<ListClassesResponse>("global.success", response);
  }
}
