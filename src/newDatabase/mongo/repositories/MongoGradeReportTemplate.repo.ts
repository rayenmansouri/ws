import { injectable } from "inversify";
import { GradeReportTemplateRepo } from "../../../feature/gradeReportTemplate/domain/GradeReportTemplate.repo";
import {
  GradeReportTemplate,
  GradeReportTemplateMetaData,
} from "../../../feature/gradeReportTemplate/domain/gradeReportTemplate.entity";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Populate } from "../../../core/populateTypes";
import { InternalError } from "../../../core/ApplicationErrors";

@injectable()
export class MongoGradeReportTemplateRepo
  extends MongoBaseRepo<GradeReportTemplateMetaData>
  implements GradeReportTemplateRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "gradeReportTemplate", session);
  }

  async list(
    filter: { search?: string; classTypeId?: ID },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<Populate<GradeReportTemplateMetaData, "classTypes" | "subjectTypes">>
  > {
    const query: FilterQuery<GradeReportTemplate> = {};

    if (filter.search) query.name = { $regex: filter.search, $options: "i" };

    if (filter.classTypeId) query.classTypes = { $in: [filter.classTypeId] };

    return await this.findManyWithPagination(query, {
      ...options,
      populate: ["classTypes", "subjectTypes"],
    });
  }

  async findDefaultTemplate(classTypeId: ID): Promise<GradeReportTemplateMetaData["entity"]> {
    const defaultTemplate = await this.model
      .findOne({
        classTypes: { $in: [classTypeId] },
        isDefault: true,
      })
      .lean();

    if (defaultTemplate) return defaultTemplate;

    const builtInTemplate = await this.model.findOne({
      isBuiltIn: true,
    });

    if (!builtInTemplate) throw new InternalError("notFound.gradeReportTemplate");

    return builtInTemplate;
  }

  async updateDefaultTemplate(id: ID): Promise<void> {
    await this.model.updateMany(
      { isDefault: true },
      { isDefault: false },
      { session: this.session },
    );

    await this.model.updateOne({ _id: id }, { isDefault: true }, { session: this.session });
  }

  async findTemplatesByClassType(
    classTypeId: ID,
  ): Promise<Populate<GradeReportTemplateMetaData, "classTypes" | "subjectTypes">[]> {
    return await this.model
      .find({ $or: [{ classTypes: { $in: [classTypeId] } }, { isBuiltIn: true }] })
      .populate(["classTypes", "subjectTypes"])
      .lean();
  }
}
