import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetChildrenOfParentUseCase } from "../../../../../feature/parents/useCases/GetChildrenOfParent.usecase";
import { StudentInvoiceDto } from "../../../../../feature/invoices/dtos/invoice.dto";
import { GetStudentInvoicesUseCase } from "../../../../../feature/invoices/useCases/GetStudentInvoices.usecase";
import {
  GetStudentInvoicesRouteConfig,
  GetStudentInvoicesResponse,
} from "./getStudentInvoices.types";

@Controller()
export class GetStudentInvoicesController extends BaseController<GetStudentInvoicesRouteConfig> {
  constructor(
    @inject("GetChildrenOfParentUseCase")
    private getChildrenOfParentUseCase: GetChildrenOfParentUseCase,
    @inject("GetStudentInvoicesUseCase")
    private getStudentInvoicesUseCase: GetStudentInvoicesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetStudentInvoicesRouteConfig>): Promise<void | APIResponse> {
    const { parentNewId } = req.params;

    const { studentNewId } = req.query;
    let response: StudentInvoiceDto;
    if (studentNewId) {
      response = await this.getStudentInvoicesUseCase.execute({
        studentNewIds: [studentNewId],
        schoolYearIds: req.query.schoolYearId ? [req.query.schoolYearId] : undefined,
      });
    } else {
      const children = await this.getChildrenOfParentUseCase.execute(parentNewId);
      const studentNewIds = children.map(child => child.newId);
      response = await this.getStudentInvoicesUseCase.execute({
        studentNewIds,
        schoolYearIds: req.query.schoolYearId ? [req.query.schoolYearId] : undefined,
      });
    }

    return new SuccessResponse<GetStudentInvoicesResponse>("global.success", response);
  }
}
