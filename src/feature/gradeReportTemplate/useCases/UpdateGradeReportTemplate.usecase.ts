import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { GradeReportTemplateRepo } from "../domain/GradeReportTemplate.repo";

export type UpdateGradeReportTemplateRequestDto = {
  name?: string;
  subjectTypes?: ID[];
  classTypes?: ID[];
  isDefault?: boolean;
};

@injectable()
export class UpdateGradeReportTemplateUseCase {
  constructor(
    @inject("GradeReportTemplateRepo") private gradeReportTemplateRepo: GradeReportTemplateRepo,
  ) {}

  async execute(templateNewId: string, data: UpdateGradeReportTemplateRequestDto): Promise<void> {
    const template = await this.gradeReportTemplateRepo.findOneByNewIdOrThrow(
      templateNewId,
      "notFound.gradeReportTemplate",
    );

    if (data.name && data.name !== template.name) {
      await this.gradeReportTemplateRepo.ensureFieldUniqueness(
        "name",
        data.name,
        "alreadyUsed.name",
      );
    }

    if (data.isDefault !== undefined && data.isDefault !== template.isDefault)
      await this.gradeReportTemplateRepo.updateDefaultTemplate(template._id);

    await this.gradeReportTemplateRepo.updateOneById(template._id, data);
  }
}
