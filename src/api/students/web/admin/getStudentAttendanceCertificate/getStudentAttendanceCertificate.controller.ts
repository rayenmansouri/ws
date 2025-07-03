import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetStudentAttendanceCertificateUseCase } from "../../../../../feature/students/useCases/GetStudentAttendanceCertificate.usecase";
import {
  GetStudentAttendanceCertificateRouteConfig,
  GetStudentAttendanceCertificateResponse,
} from "./getStudentAttendanceCertificate.types";

@Controller()
export class GetStudentAttendanceCertificateController extends BaseController<GetStudentAttendanceCertificateRouteConfig> {
  constructor(
    @inject("GetStudentAttendanceCertificateUseCase")
    private getStudentAttendanceCertificateUseCase: GetStudentAttendanceCertificateUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetStudentAttendanceCertificateRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.getStudentAttendanceCertificateUseCase.execute(
      req.params.studentNewId,
    );

    return new SuccessResponse<GetStudentAttendanceCertificateResponse>("global.success", response);
  }
}
