import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetGroupsOfClassUseCase } from "../../../../../feature/classes/useCases/GetGroupsOfClass.usecase";
import { GetStudentsOfClassUseCase } from "../../../../../feature/classes/useCases/GetStudentsOfClass.usecase";
import {
  GetStudentsOfClassResponse,
  GetStudentsOfClassRouteConfig,
} from "./getStudentsOfClass.types";

@Controller()
export class GetStudentsOfClassController extends BaseExportController<
  GetStudentsOfClassRouteConfig,
  GetStudentsOfClassResponse
> {
  constructor(
    @inject("GetStudentsOfClassUseCase")
    private getStudentsOfClassUseCase: GetStudentsOfClassUseCase,
    @inject("GetGroupsOfClassUseCase") private getGroupsOfClassUseCase: GetGroupsOfClassUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetStudentsOfClassRouteConfig>): Promise<APIResponse> {
    const { classNewId } = req.params;

    const studentsInClass = await this.getStudentsOfClassUseCase.execute(classNewId);

    return new SuccessResponse<GetStudentsOfClassResponse>("global.success", studentsInClass);
  }

  formatDataBeforeExport(data: GetStudentsOfClassResponse): Array<Record<string, string>> {
    return data.map(student => ({
      newId: student.newId,
      fullName: student.fullName,
      group: student.group.name,
      gender: student.gender,
      email: student.email || "-",
    }));
  }
}
