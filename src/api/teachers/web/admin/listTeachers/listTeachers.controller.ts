import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListTeachersUseCase } from "../../../../../feature/teachers/useCases/ListTeachers.usecase";
import { ListTeachersResponse, ListTeachersRouteConfig } from "./listTeachers.types";

@Controller()
export class ListTeachersController extends BaseExportController<
  ListTeachersRouteConfig,
  ListTeachersResponse
> {
  constructor(@inject("ListTeachersUseCase") private listTeachersUseCase: ListTeachersUseCase) {
    super();
  }

  async main(req: TypedRequest<ListTeachersRouteConfig>): Promise<APIResponse> {
    const response = await this.listTeachersUseCase.execute(
      {
        search: req.query.search,
        gender: req.query.gender,
        level: req.query.level,
        subjectType: req.query.subjectType,
        groupType: req.query.groupType,
        isArchived: req.query.isArchived,
        isActive: req.query.isActive,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListTeachersResponse>("global.listSuccessfullyRetrieved", response);
  }

  formatDataBeforeExport(data: ListTeachersResponse): Array<{
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    newId: string;
    roles: string;
    levels: string;
    topics: string;
  }> {
    return data.docs.map(teacher => ({
      fullName: teacher.fullName,
      email: teacher.email || "-",
      phoneNumber: teacher.phoneNumber || "-",
      gender: teacher.gender,
      roles: teacher.roles?.map(role => role.name).join(", "),
      levels: teacher.levels.map(level => level.name).join(", "),
      newId: teacher.newId,
      topics: teacher.topics.map(topic => topic.name).join(", "),
    }));
  }
}
