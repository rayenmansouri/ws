import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  SwitchStudentsClassRouteConfig,
  SwitchStudentsClassResponse,
} from "./switchStudentsClass.types";
import {
  SwitchStudentsClassUseCase,
  SwitchStudentsClassRequestDto,
} from "../../../../../feature/students/useCases/switchStudentsClass.usecase";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class SwitchStudentsClassController extends BaseController<SwitchStudentsClassRouteConfig> {
  constructor(
    @inject("SwitchStudentsClassUseCase")
    private readonly switchStudentsClassUseCase: SwitchStudentsClassUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<SwitchStudentsClassRouteConfig>): Promise<void | APIResponse> {
    const dto: SwitchStudentsClassRequestDto = {
      studentsNewIds: req.body.studentNewIds,
      classNewId: req.body.classNewId,
    };

    await this.switchStudentsClassUseCase.execute(dto);
    return new SuccessResponse<SwitchStudentsClassResponse>("global.success");
  }
}
