import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListDocumentsOfStudentsUseCase } from "../../../../../feature/documents/useCases/ListDocumentsOfStudents.usecase";
import {
  ListDocumentsOfStudentRouteConfig,
  ListDocumentsOfStudentResponse,
} from "./listDocumentsOfStudent.types";

@Controller()
export class ListDocumentsOfStudentController extends BaseController<ListDocumentsOfStudentRouteConfig> {
  constructor(
    @inject("ListDocumentsOfStudentsUseCase")
    private listDocumentsOfStudentsUseCase: ListDocumentsOfStudentsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListDocumentsOfStudentRouteConfig>): Promise<void | APIResponse> {
    const studentNewId = req.user.newId;
    const { search, limit, page, teacherIds, subjectTypeIds, sources, groupIds } = req.query;
    const documents = await this.listDocumentsOfStudentsUseCase.execute({
      studentNewId,
      search,
      limit,
      page,
      teacherIds,
      subjectTypeIds,
      sources: sources && sources?.length ? sources : [],
      groupIds,
    });
    return new SuccessResponse<ListDocumentsOfStudentResponse>("global.success", documents);
  }
}
