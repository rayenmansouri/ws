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
import { Parent } from "../../../../../feature/parents/domain/parent.entity";
import { StudentRepo } from "../../../../../feature/students/domain/Student.repo";
import { StudentService } from "../../../../../feature/students/domain/Student.service";
import {
  ListHomeworksByParentResponse,
  ListHomeworksByParentRouteConfig,
} from "./listHomeworksByParent.types";

@Controller()
export class ListHomeworksByParentController extends BaseController<ListHomeworksByParentRouteConfig> {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ListHomeworkUseCase") private listHomeworkUseCase: ListHomeworkUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListHomeworksByParentRouteConfig>): Promise<void | APIResponse> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(
      req.params.studentNewId,
      "notFound.student",
    );

    const parent = req.user as unknown as Parent;

    StudentService.ensureStudentIsAssignedToParent(student._id, parent);

    const dto: listHomeworksRequestDto = {
      filter: {
        student,
        search: req.query.search,
        status: req.query.status,
      },
      options: {
        limit: req.query.limit,
        page: req.query.page,
      },
    };

    const response = await this.listHomeworkUseCase.execute(dto);

    return new SuccessResponse<ListHomeworksByParentResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
