import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListPreRegistrationsUseCase } from "../../../../../feature/preRegistration/useCases/ListPreRegistrations.usecase";
import {
  ListPreRegistrationResponse,
  ListPreRegistrationRouteConfig,
} from "./listPreRegistration.types";

@Controller()
export class ListPreRegistrationController extends BaseExportController<
  ListPreRegistrationRouteConfig,
  ListPreRegistrationResponse
> {
  constructor(
    @inject("ListPreRegistrationsUseCase")
    private listPreRegistrationsUseCase: ListPreRegistrationsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListPreRegistrationRouteConfig>): Promise<APIResponse> {
    const response = await this.listPreRegistrationsUseCase.execute(
      {
        search: req.query.search,
        level: req.query.level,
        status: req.query.status,
        isRegistered: req.query.isRegistered,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListPreRegistrationResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }

  formatDataBeforeExport(data: ListPreRegistrationResponse): Array<{
    parentFullName: string;
    parentFirstName: string;
    parentLastName: string;
    parentEmail: string;
    parentPhoneNumber: string;
    preferredLanguage: string;
    parentAddress: string;
    job: string;
    studentFullName: string;
    studentFirstName: string;
    studentLastName: string;
    studentEmail: string;
    studentBirthDate: string;
    studentAddress: string;
    studentGender: string;
    studentPhoneNumber: string;
  }> {
    return data.docs.map(doc => ({
      parentFullName: doc.parentFullName || "",
      parentFirstName: doc.parentFirstName || "",
      parentLastName: doc.parentLastName || "",
      parentEmail: doc.parentEmail || "",
      parentPhoneNumber: doc.parentPhoneNumber || "",
      preferredLanguage: doc.preferredLanguage || "",
      parentAddress: doc.parentAddress || "",
      job: doc.job || "",
      studentFullName: doc.studentFullName || "",
      studentFirstName: doc.studentFirstName || "",
      studentLastName: doc.studentLastName || "",
      studentEmail: doc.studentEmail || "",
      studentBirthDate: doc.studentBirthDate?.toLocaleDateString("fr") || "",
      studentAddress: doc.studentAddress || "",
      studentGender: doc.studentGender || "",
      studentPhoneNumber: doc.studentPhoneNumber || "",
    }));
  }
}
