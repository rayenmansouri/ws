import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { GradeReportTemplateMetaData } from "./gradeReportTemplate.entity";

export abstract class GradeReportTemplateRepo extends BaseRepo<GradeReportTemplateMetaData> {
  abstract list(
    filter: { search?: string; classTypeId?: ID },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<Populate<GradeReportTemplateMetaData, "classTypes" | "subjectTypes">>
  >;

  abstract findDefaultTemplate(classTypeId: ID): Promise<GradeReportTemplateMetaData["entity"]>;

  abstract updateDefaultTemplate(id: ID): Promise<void>;

  abstract findTemplatesByClassType(
    classTypeId: ID,
  ): Promise<Populate<GradeReportTemplateMetaData, "classTypes" | "subjectTypes">[]>;
}
