import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { GradeReportTemplateRepo } from "../domain/GradeReportTemplate.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

@injectable()
export class DeleteGradeReportTemplateUseCase {
  constructor(
    @inject("GradeReportTemplateRepo") private gradeReportTemplateRepo: GradeReportTemplateRepo,
  ) {}

  async execute(templateNewId: string): Promise<void> {
    const template = await this.gradeReportTemplateRepo.findOneByNewIdOrThrow(
      templateNewId,
      "notFound.gradeReportTemplate",
    );

    if (template.isDefault)
      throw new BadRequestError("gradeReportTemplate.cannotDeleteDefaultTemplate");

    if (template.isBuiltIn)
      throw new BadRequestError("gradeReportTemplate.cannotDeleteBuiltInTemplate");

    await this.gradeReportTemplateRepo.deleteOneById(template._id);
  }
}
