import { ConfirmAttendanceRequestDTO } from "./../../../../../feature/sessionManagement/useCases/confirmAttendance.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ConfirmAttendanceRouteConfig, ConfirmAttendanceResponse } from "./confirmAttendance.types";
import { ConfirmAttendanceUseCase } from "../../../../../feature/sessionManagement/useCases/confirmAttendance.usecase";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class ConfirmAttendanceController extends BaseController<ConfirmAttendanceRouteConfig> {
  constructor(
    @inject("ConfirmAttendanceUseCase") private confirmAttendanceUseCase: ConfirmAttendanceUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ConfirmAttendanceRouteConfig>): Promise<void | APIResponse> {
    const confirmAttendanceRequestDto: ConfirmAttendanceRequestDTO = {
      sessionNewId: req.params.sessionNewId,
      userId: req.user._id,
      userType: req.userType as "teacher" | "admin",
      attendanceStatus: req.body.newStatus,
      tenantId: req.tenantId,
      studentId: req.body.studentId,
    };

    const result = await this.confirmAttendanceUseCase.execute(confirmAttendanceRequestDto);
    return new SuccessResponse<ConfirmAttendanceResponse>("global.success", result);
  }
}
