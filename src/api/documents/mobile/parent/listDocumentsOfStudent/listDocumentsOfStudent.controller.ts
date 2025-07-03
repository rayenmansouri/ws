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
    const studentNewId = req.params.studentNewId;
    const { search, limit, page, sources, subjectTypeIds, groupIds, teacherIds } = req.query;
    const documents = await this.listDocumentsOfStudentsUseCase.execute({
      studentNewId,
      search: search || undefined,
      limit,
      page,
      sources: sources && sources?.length ? sources : [],
      subjectTypeIds: subjectTypeIds && subjectTypeIds?.length ? subjectTypeIds : undefined,
      groupIds: groupIds && groupIds?.length ? groupIds : undefined,
      teacherIds: teacherIds && teacherIds?.length ? teacherIds : undefined,
    });
    return new SuccessResponse<ListDocumentsOfStudentResponse>("global.success", documents);
  }
}
