import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListAdminsUseCase } from "../../../../../feature/admins/useCases/ListAdmins.usecase";
import { ListAdminsResponse, ListAdminsRouteConfig } from "./listAdmins.types";

@Controller()
export class ListAdminsController extends BaseExportController<
  ListAdminsRouteConfig,
  ListAdminsResponse
> {
  constructor(@inject("ListAdminsUseCase") private listAdminsUseCase: ListAdminsUseCase) {
    super();
  }

  async main(req: TypedRequest<ListAdminsRouteConfig>): Promise<APIResponse> {
    const response = await this.listAdminsUseCase.execute(
      { search: req.query.search, isArchived: req.query.isArchived },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListAdminsResponse>("global.listSuccessfullyRetrieved", response);
  }

  formatDataBeforeExport(data: ListAdminsResponse): Array<{
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    newId: string;
    roles: string;
  }> {
    return data.docs.map(admin => ({
      fullName: admin.fullName,
      email: admin.email || "-",
      phoneNumber: admin.phoneNumber || "-",
      gender: admin.gender,
      roles: admin.roles.map(role => role.name).join(", "),
      newId: admin.newId,
    }));
  }
}
