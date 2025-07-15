import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  UnPayTeacherUseCase,
  unpayTeacherRequestDto,
} from "../../../../../feature/teacherPayment/usecases/unPayTeacher.usecase";
import { UnPayTeacherResponse, UnPayTeacherRouteConfig } from "./unPayTeacher.types";

@Controller()
export class UnPayTeacherController extends BaseController<UnPayTeacherRouteConfig> {
  constructor(@inject("UnPayTeacherUseCase") private readonly usecase: UnPayTeacherUseCase) {
    super();
  }

  async main(req: TypedRequest<UnPayTeacherRouteConfig>): Promise<void | APIResponse> {
    const dto: unpayTeacherRequestDto = {
      month: req.body.month,
      year: req.body.year,
      teacherNewId: req.params.teacherNewId,
    };
    await this.usecase.execute(dto);
    return new SuccessResponse<UnPayTeacherResponse>("global.success");
  }
}
