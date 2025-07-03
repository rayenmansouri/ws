import { listHomeworksRequestDto } from "./../../../../../feature/homeworks/useCases/ListHomeworks.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ClassRepo } from "../../../../../feature/classes/domain/Class.repo";
import { ListHomeworkUseCase } from "../../../../../feature/homeworks/useCases/ListHomeworks.usecase";
import { ID } from "../../../../../types/BaseEntity";
import {
  ListHomeworksByTeacherResponse,
  ListHomeworksByTeacherRouteConfig,
} from "./listHomeworksByTeacher.types";

@Controller()
export class ListHomeworksByTeacherController extends BaseController<ListHomeworksByTeacherRouteConfig> {
  constructor(
    @inject("ListHomeworkUseCase") private listHomeworkUseCase: ListHomeworkUseCase,
    @inject("ClassRepo") private classRepo: ClassRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<ListHomeworksByTeacherRouteConfig>): Promise<APIResponse> {
    let classId: ID | undefined;

    if (req.query.classNewId)
      classId = (await this.classRepo.findOneByNewIdOrThrow(req.query.classNewId, "notFound.class"))
        ._id;

    const dto: listHomeworksRequestDto = {
      filter: {
        status: req.query.status,
        search: req.query.search,
        teacherId: req.user._id,
        classId,
      },
      options: {
        limit: req.query.limit,
        page: req.query.page,
      },
    };
    const response = await this.listHomeworkUseCase.execute(dto);

    return new SuccessResponse<ListHomeworksByTeacherResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
