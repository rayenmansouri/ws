import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { SchoolYear } from "../domain/schoolYear.entity";
import { SchoolYearRepo } from "../domain/SchoolYear.repo";

@injectable()
export class ListSchoolYearUseCase {
  constructor(@inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo) {}

  async execute(query: {
    search?: string;
    options: ListOptions;
  }): Promise<ResponseWithPagination<SchoolYear>> {
    return await this.schoolYearRepo.list(query.search, query.options);
  }
}
