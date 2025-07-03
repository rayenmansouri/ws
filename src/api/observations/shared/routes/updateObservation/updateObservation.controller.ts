import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateObservationUseCase } from "../../../../../feature/observations/useCases/UpdateObservation.usecase";
import { UpdateObservationRouteConfig, UpdateObservationResponse } from "./updateObservation.types";

@Controller()
export class UpdateObservationController extends BaseController<UpdateObservationRouteConfig> {
  constructor(
    @inject("UpdateObservationUseCase")
    private updateObservationUseCase: UpdateObservationUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateObservationRouteConfig>): Promise<void | APIResponse> {
    const fileDetails = req.files?.files?.map(file => ({ ...file, name: file.originalname })) || [];

    const response = await this.updateObservationUseCase.execute({
      observationNewId: req.params.observationNewId,
      observationReasonNewId: req.body.observationReason,
      note: req.body.note,
      deletedFiles: req.body.deletedFiles,
      studentNewIds: req.body.students,
      files: fileDetails,
    });
    return new SuccessResponse<UpdateObservationResponse>("global.success", response);
  }
}
