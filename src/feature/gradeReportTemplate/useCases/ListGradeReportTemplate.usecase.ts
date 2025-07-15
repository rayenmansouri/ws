import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { GradeReportTemplateRepo } from "../domain/GradeReportTemplate.repo";
import { GradeReportTemplateDTO } from "../dtos/gradeReportTemplate.dto";
import { ListOptions } from "../../../types/types";
import { GradeReportTemplateMapper } from "../mappers/GradeReportTemplate.mapper";

@injectable()
export class ListGradeReportTemplateUseCase {
  constructor(
    @inject("GradeReportTemplateRepo") private gradeReportTemplateRepo: GradeReportTemplateRepo,
  ) {}

  async execute(
    filter: {
      search?: string;
      classTypeId?: ID;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<GradeReportTemplateDTO>> {
    const result = await this.gradeReportTemplateRepo.list(filter, options);

    return {
      meta: result.meta,
      docs: result.docs.map(doc => GradeReportTemplateMapper.toDTO(doc)),
    };
  }
}
