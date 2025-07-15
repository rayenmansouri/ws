import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { LevelRepo } from "../../../../../feature/levels/repos/Level.repo";
import { GetChildrenOfParentUseCase } from "../../../../../feature/parents/useCases/GetChildrenOfParent.usecase";
import { GetStudentInvoicesUseCase } from "../../../../../feature/invoices/useCases/GetStudentInvoices.usecase";
import { GetChildInvoicesRouteConfig, GetChildInvoicesResponse } from "./getChildInvoices.types";

@Controller()
export class GetChildInvoicesController extends BaseController<GetChildInvoicesRouteConfig> {
  constructor(
    @inject("GetStudentInvoicesUseCase")
    private getStudentInvoicesUseCase: GetStudentInvoicesUseCase,
    @inject("GetChildrenOfParentUseCase")
    private getChildrenOfParentUseCase: GetChildrenOfParentUseCase,
    @inject("LevelRepo") private levelRepo: LevelRepo, //TODO Need to create usecase for this
  ) {
    super();
  }

  async main(req: TypedRequest<GetChildInvoicesRouteConfig>): Promise<void | APIResponse> {
    const children = await this.getChildrenOfParentUseCase.execute(req.user.newId);
    const studentNewIds = req.query.studentNewId
      ? [req.query.studentNewId]
      : children.map(child => child.newId);

    const levelIds = children.map(child => child.level);
    const levels = await this.levelRepo.findManyByIds(levelIds);
    const studentCurrentSchoolYearIds = levels.map(level => level.currentSchoolYear._id);

    const invoices = await this.getStudentInvoicesUseCase.execute({
      studentNewIds,
      schoolYearIds: studentCurrentSchoolYearIds,
    });

    const response = [...invoices.mainInvoices, ...invoices.oneTimeInvoices];

    return new SuccessResponse<GetChildInvoicesResponse>("global.success", response);
  }
}
