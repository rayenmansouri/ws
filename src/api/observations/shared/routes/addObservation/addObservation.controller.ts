import { BadRequestError } from "../../../../../core/ApplicationErrors";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ObservationDTO } from "../../../../../feature/observations/dtos/observation.dto";
import { AddObservationForClassUseCase } from "../../../../../feature/observations/useCases/AddObservationForClass.usecase";
import { AddObservationForGroupUseCase } from "../../../../../feature/observations/useCases/AddObservationForGroup.usecase";
import { AddObservationRouteConfig, AddObservationResponse } from "./addObservation.types";

@Controller()
export class AddObservationController extends BaseController<AddObservationRouteConfig> {
  constructor(
    @inject("AddObservationForClassUseCase")
    private addObservationForClassUseCase: AddObservationForClassUseCase,
    @inject("AddObservationForGroupUseCase")
    private addObservationForGroupUseCase: AddObservationForGroupUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddObservationRouteConfig>): Promise<void | APIResponse> {
    let response: ObservationDTO;

    const fileDetails = req.files?.files?.map(file => ({ ...file, name: file.originalname })) || [];

    const data = {
      ...req.body,
      user: { ...req.user, roles: [] },
      userType: req.userType as "teacher" | "admin",
      files: fileDetails,
      sessionId: req.body.session || null,
    };
    if (req.body.classNewId) {
      response = await this.addObservationForClassUseCase.execute({
        ...data,
        classNewId: req.body.classNewId,
        observationReasonNewId: req.body.observationReason,
        studentNewIds: req.body.students,
        tenantId: req.tenantId,
      });
    } else if (req.body.groupNewId) {
      response = await this.addObservationForGroupUseCase.execute({
        ...data,
        groupNewId: req.body.groupNewId,
        observationReasonNewId: req.body.observationReason,
        studentNewIds: req.body.students,
        tenantId: req.tenantId,
      });
    } else {
      throw new BadRequestError("Class New Id or Group New Id is required");
    }

    return new SuccessResponse<AddObservationResponse>("global.success", response);
  }
}
