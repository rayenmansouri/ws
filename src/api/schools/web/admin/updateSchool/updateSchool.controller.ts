import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { School } from "../../../../../feature/schools/domain/school.entity";
import { UpdateSchoolUseCase } from "../../../../../feature/schools/useCases/UpdateSchool.usecase";
import { UpdateSchoolResponse, UpdateSchoolRouteConfig } from "./updateSchool.types";

@Controller()
export class UpdateSchoolController extends BaseController<UpdateSchoolRouteConfig> {
  constructor(
    @inject("UpdateSchoolUseCase") private updateSchoolUseCase: UpdateSchoolUseCase,
    @inject("School") private school: School,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSchoolRouteConfig>): Promise<void | APIResponse> {
    let cover: FileUploadPayload | undefined;
    let logo: FileUploadPayload | undefined;
    let financeSignature: FileUploadPayload | undefined;
    let academicSignature: FileUploadPayload | undefined;

    if (req.files?.cover?.[0]) {
      const coverFile = req.files.cover[0];
      cover = {
        buffer: coverFile.buffer,
        mimetype: coverFile.mimetype,
        name: coverFile.originalname,
      };
    }
    if (req.files?.logo?.[0]) {
      const logoFile = req.files.logo[0];
      logo = {
        buffer: logoFile.buffer,
        mimetype: logoFile.mimetype,
        name: logoFile.originalname,
      };
    }

    if (req.files?.financeSignature?.[0]) {
      const financeSignatureFile = req.files.financeSignature[0];
      financeSignature = {
        buffer: financeSignatureFile.buffer,
        mimetype: financeSignatureFile.mimetype,
        name: financeSignatureFile.originalname,
      };
    }

    if (req.files?.academicSignature?.[0]) {
      const academicSignatureFile = req.files.academicSignature[0];
      academicSignature = {
        buffer: academicSignatureFile.buffer,
        mimetype: academicSignatureFile.mimetype,
        name: academicSignatureFile.originalname,
      };
    }

    await this.updateSchoolUseCase.execute(this.school.newId, {
      ...req.body,
      cover,
      logo,
      financeSignature,
      academicSignature,
      schedule: {
        startHour: req.body.startHour,
        endHour: req.body.endHour,
        days: req.body.days,
        step: req.body.step ? +req.body.step : undefined,
      },
    });

    return new SuccessResponse<UpdateSchoolResponse>("global.success");
  }
}
