import { BadRequestError } from "./../../../../../core/ApplicationErrors";
import { Admin } from "./../../../../../feature/admins/domain/admin.entity";
import { Parent } from "./../../../../../feature/parents/domain/parent.entity";
import {
  GetTeacherOfStudentUseCase,
  getTeacherOfStudentUseCaseRequestDto,
} from "./../../../../../feature/issues/usecases/GetTeacherOfStudent.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetTeachersOfStudentRouteConfig,
  GetTeachersOfStudentResponse,
} from "./getTeachersOfStudent.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class GetTeachersOfStudentController extends BaseController<GetTeachersOfStudentRouteConfig> {
  constructor(@inject("GetTeacherOfStudentUseCase") private usecase: GetTeacherOfStudentUseCase) {
    super();
  }

  async main(req: TypedRequest<GetTeachersOfStudentRouteConfig>): Promise<void | APIResponse> {
    if (req.userType !== "admin" && req.userType !== "parent")
      throw new BadRequestError("invalid user type");
    const dto: getTeacherOfStudentUseCaseRequestDto = {
      studentNewId: req.params.studentNewId,
      user: req.user as unknown as Parent | Admin,
      userType: req.userType,
    };

    const result = await this.usecase.execute(dto);
    return new SuccessResponse<GetTeachersOfStudentResponse>("global.success", result);
  }
}
