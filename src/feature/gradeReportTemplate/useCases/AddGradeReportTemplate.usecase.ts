import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { GradeReportTemplateRepo } from "../domain/GradeReportTemplate.repo";
import { ID } from "../../../types/BaseEntity";

export type AddGradeReportTemplateRequestDto = {
  name: string;
  subjectTypes: ID[];
  classTypes: ID[];
  isDefault: boolean;
};

@injectable()
export class AddGradeReportTemplateUseCase {
  constructor(
    @inject("GradeReportTemplateRepo") private gradeReportTemplateRepo: GradeReportTemplateRepo,
  ) {}

  async execute(data: AddGradeReportTemplateRequestDto): Promise<void> {
    await this.gradeReportTemplateRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    const template = await this.gradeReportTemplateRepo.addOne({
      ...data,
      isDefault: false,
      isBuiltIn: false,
    });

    if (data.isDefault) await this.gradeReportTemplateRepo.updateDefaultTemplate(template._id);
  }
}
