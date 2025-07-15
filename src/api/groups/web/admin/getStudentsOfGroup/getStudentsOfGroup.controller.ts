import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GroupRepo } from "../../../../../feature/groupManagement/repos/Group.repo";
import { GetStudentsOfGroupUseCase } from "../../../../../feature/groupManagement/useCases/GetStudentsOfGroup.usecase";
import {
  GetStudentsOfGroupResponse,
  GetStudentsOfGroupRouteConfig,
} from "./getStudentsOfGroup.types";

@Controller()
export class GetStudentsOfGroupController extends BaseExportController<
  GetStudentsOfGroupRouteConfig,
  GetStudentsOfGroupResponse
> {
  constructor(
    @inject("GetStudentsOfGroupUseCase")
    private getStudentsOfGroupUseCase: GetStudentsOfGroupUseCase,
    @inject("GroupRepo") private groupRepo: GroupRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<GetStudentsOfGroupRouteConfig>): Promise<APIResponse> {
    const students = await this.getStudentsOfGroupUseCase.execute(req.params.groupNewId);
    const group = await this.groupRepo.findOneByNewIdOrThrow(
      req.params.groupNewId,
      "notFound.group",
    );

    return new SuccessResponse<GetStudentsOfGroupResponse>("global.success", {
      studentList: students,
      classTypes: group.classTypes,
    });
  }

  formatDataBeforeExport(data: GetStudentsOfGroupResponse): Array<Record<string, string>> {
    return data.studentList.map(student => ({
      newId: student.newId,
      fullName: student.fullName,
      email: student.email || "",
      gender: student.gender,
    }));
  }
}
