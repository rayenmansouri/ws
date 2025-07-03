import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListClassTypeUseCase } from "../../../../../feature/classTypes/useCases/ListClassTypes.usecase";
import { GetTeacherProfileUsecase } from "../../../../../feature/teachers/useCases/GetTeacherProfile.usecase";
import { ListClassTypesResponse, ListClassTypesRouteConfig } from "./listClassTypes.types";

@Controller()
export class ListClassTypesController extends BaseController<ListClassTypesRouteConfig> {
  constructor(
    @inject("ListClassTypeUseCase") private listClassTypeUseCase: ListClassTypeUseCase,
    @inject("GetTeacherProfileUsecase") private getTeacherProfileUsecase: GetTeacherProfileUsecase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListClassTypesRouteConfig>): Promise<void | APIResponse> {
    const teacherProfile = await this.getTeacherProfileUsecase.execute({
      teacherNewId: req.user.newId,
    });

    const classTypeIds = teacherProfile.classes.map(classDoc => classDoc.classType);

    const classTypes = await this.listClassTypeUseCase.execute(
      {
        levelNewIds: null,
        subLevelNewIds: null,
        sectionNewIds: null,
        search: null,
        classTypesIds: classTypeIds,
      },
      { page: req.query.page, limit: req.query.limit },
    );

    return new SuccessResponse<ListClassTypesResponse>("global.success", classTypes);
  }
}
