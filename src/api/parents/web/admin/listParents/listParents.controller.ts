import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListParentsUseCase } from "../../../../../feature/parents/useCases/ListParents.usecase";
import { ListParentsResponse, ListParentsRouteConfig } from "./listParents.types";

@Controller()
export class ListParentsController extends BaseExportController<
  ListParentsRouteConfig,
  ListParentsResponse
> {
  constructor(@inject("ListParentsUseCase") private listParentsUseCase: ListParentsUseCase) {
    super();
  }

  async main(req: TypedRequest<ListParentsRouteConfig>): Promise<APIResponse> {
    const response = await this.listParentsUseCase.execute(
      {
        search: req.query.search,
        isArchived: req.query.isArchived,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListParentsResponse>("global.listSuccessfullyRetrieved", response);
  }

  formatDataBeforeExport(data: ListParentsResponse): Array<{
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    CIN: string;
    students: string;
  }> {
    return data.docs.map(parent => {
      return {
        fullName: parent.fullName,
        email: parent.email || "-",
        phoneNumber: parent.phoneNumber || "-",
        gender: parent.gender,
        CIN: parent.nationalCardId || "-",
        students: parent.students.map(student => student.fullName).join(", "),
      };
    });
  }
}
