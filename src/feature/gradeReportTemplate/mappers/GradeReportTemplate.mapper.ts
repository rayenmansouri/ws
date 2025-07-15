import { Populate } from "../../../core/populateTypes";
import { GradeReportTemplateMetaData } from "../domain/gradeReportTemplate.entity";
import { GradeReportTemplateDTO } from "../dtos/gradeReportTemplate.dto";

export class GradeReportTemplateMapper {
  static toDTO(
    template: Populate<GradeReportTemplateMetaData, "classTypes" | "subjectTypes">,
  ): GradeReportTemplateDTO {
    return {
      _id: template._id,
      newId: template.newId,
      name: template.name,
      subjects: template.subjectTypes.map(subject => ({
        _id: subject._id,
        newId: subject.newId,
        name: subject.name,
      })),
      classTypes: template.classTypes.map(classType => ({
        _id: classType._id,
        newId: classType.newId,
        name: classType.name,
      })),
      isDefault: template.isDefault,
      isBuiltIn: template.isBuiltIn,
    };
  }
}
