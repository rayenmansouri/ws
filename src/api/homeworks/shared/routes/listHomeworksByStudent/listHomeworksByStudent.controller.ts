import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  ListHomeworkUseCase,
  listHomeworksRequestDto,
} from "../../../../../feature/homeworks/useCases/ListHomeworks.usecase";
import { Student } from "../../../../../feature/students/domain/student.entity";
import {
  ListHomeworksByStudentResponse,
  ListHomeworksByStudentRouteConfig,
} from "./listHomeworksByStudent.types";

@Controller()
export class ListHomeworksByStudentController extends BaseController<ListHomeworksByStudentRouteConfig> {
  constructor(@inject("ListHomeworkUseCase") private listHomeworkUseCase: ListHomeworkUseCase) {
    super();
  }

  async main(req: TypedRequest<ListHomeworksByStudentRouteConfig>): Promise<void | APIResponse> {
    const dto: listHomeworksRequestDto = {
      filter: {
        status: req.query.status,
        search: req.query.search,
        student: req.user as unknown as Student,
      },
      options: {
        page: req.query.page,
        limit: req.query.limit,
      },
    };

    const response = await this.listHomeworkUseCase.execute(dto);

    return new SuccessResponse<ListHomeworksByStudentResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
