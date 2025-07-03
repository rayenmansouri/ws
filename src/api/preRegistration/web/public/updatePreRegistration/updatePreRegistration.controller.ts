import { NotFoundError } from "../../../../../core/ApplicationErrors";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { FileUploadPayload } from "../../../../../core/fileManager/FileManager";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { schoolDocStore } from "../../../../../core/subdomainStore";
import { getNewTenantConnection } from "../../../../../database/connectionDB/tenantPoolConnection";
import { School } from "../../../../../feature/schools/domain/school.entity";
import {
  UpdatePreRegistrationResponse,
  UpdatePreRegistrationRouteConfig,
} from "./updatePreRegistration.types";

@Controller()
export class UpdatePreRegistrationController extends BaseController<UpdatePreRegistrationRouteConfig> {
  constructor() {
    super();
  }

  async main(req: TypedRequest<UpdatePreRegistrationRouteConfig>): Promise<void | APIResponse> {
    const { body, files } = req;

    const subDomain = body.subdomain;

    const school = Object.values(schoolDocStore).find(
      school => school.subdomain === subDomain,
    ) as School | null;
    if (!school) throw new NotFoundError("notFound.school");

    const connection = await getNewTenantConnection(subDomain);
    req.container.rebind("Connection").toConstantValue(connection);
    const updatePreRegistrationUseCase = req.container.get("UpdatePreRegistrationUseCase");

    const birthCertificateFiles: FileUploadPayload[] | null =
      files?.birthCertificate?.map(file => ({
        name: file.originalname,
        mimetype: file.mimetype,
        buffer: file.buffer,
      })) || null;

    const previousTranscriptsFiles: FileUploadPayload[] | null =
      files?.previousTranscripts?.map(file => ({
        name: file.originalname,
        mimetype: file.mimetype,
        buffer: file.buffer,
      })) || null;

    const payload = { ...body, birthCertificateFiles, previousTranscriptsFiles };
    const preRegistrationId = body.id || null;

    const response = await updatePreRegistrationUseCase.execute(preRegistrationId, payload);

    return new SuccessResponse<UpdatePreRegistrationResponse>("global.success", response);
  }
}
