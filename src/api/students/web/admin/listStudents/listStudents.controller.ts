import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListStudentsUseCase } from "../../../../../feature/students/useCases/ListStudents.usecase";
import { ListStudentsResponse, ListStudentsRouteConfig } from "./listStudents.types";

@Controller()
export class ListStudentsController extends BaseExportController<
  ListStudentsRouteConfig,
  ListStudentsResponse
> {
  constructor(@inject("ListStudentsUseCase") private listStudentsUseCase: ListStudentsUseCase) {
    super();
  }

  async main(req: TypedRequest<ListStudentsRouteConfig>): Promise<APIResponse> {
    const response = await this.listStudentsUseCase.execute({
      search: req.query.search,
      classTypeNewIds: req.query.classTypeNewIds,
      gender: req.query.gender,
      level: req.query.level,
      isArchived: req.query.isArchived,
      isActive: req.query.isActive,
      page: req.query.page,
      limit: req.query.limit,
    });

    return new SuccessResponse<ListStudentsResponse>("global.listSuccessfullyRetrieved", response);
  }

  formatDataBeforeExport(data: ListStudentsResponse): Array<{
    firstName: string;
    lastName: string;
    gender: string;
    address1: string;
    phoneNumber: string;
    birthDate: string;
    level: string;
    classType: string;
    parents: string;
    newId: string;
    fullName: string;
    uniqueId: string;
    parentPhoneNumber: string;
  }> {
    return data.docs.map(student => ({
      firstName: student.firstName,
      lastName: student.lastName,
      gender: student.gender,
      address1: student.address1 || "-",
      phoneNumber: student.phoneNumber || "-",
      classType: student.classType?.name,
      birthDate: student.birthDate?.toLocaleDateString("fr") || "-",
      level: student.level.name,
      parents: student.parents.map(parent => parent.fullName).join(", "),
      uniqueId: student.uniqueId || "-",
      newId: student.newId,
      fullName: student.fullName,
      parentPhoneNumber: student.parents.at(0)?.phoneNumber || "-",
    }));
  }
}
