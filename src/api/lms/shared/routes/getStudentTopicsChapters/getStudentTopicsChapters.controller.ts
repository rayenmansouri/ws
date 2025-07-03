import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { BadRequestError } from "../../../../../core/ApplicationErrors";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetStudentChaptersUseCase } from "../../../../../feature/lms/useCases/GetStudentChapters.usecase";
import {
  GetStudentTopicsChaptersResponse,
  GetStudentTopicsChaptersRouteConfig,
} from "./getStudentTopicsChapters.types";

@Controller()
export class GetStudentTopicsChaptersController extends BaseController<GetStudentTopicsChaptersRouteConfig> {
  constructor(
    @inject("GetStudentChaptersUseCase")
    private getStudentChaptersUseCase: GetStudentChaptersUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetStudentTopicsChaptersRouteConfig>): Promise<void | APIResponse> {
    const studentNewId =
      req.userType === END_USER_ENUM.STUDENT ? req.user.newId : req.query.studentNewId;

    if (!studentNewId) throw new BadRequestError("Student New Id is required");

    const topicChapters = await this.getStudentChaptersUseCase.execute(studentNewId);

    return new SuccessResponse<GetStudentTopicsChaptersResponse>("global.success", topicChapters);
  }
}
