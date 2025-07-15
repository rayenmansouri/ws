import { injectable } from "inversify";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { SchoolDTO } from "../dtos/School.dto";
import { inject } from "../../../core/container/TypedContainer";
import { SchoolRepo } from "../domain/School.repo";
import { ListOptions } from "../../../types/types";
import { SchoolMapper } from "../mappers/School.mapper";

@injectable()
export class ListSchoolsUseCase {
  constructor(@inject("SchoolRepo") private schoolRepo: SchoolRepo) {}

  async execute(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<SchoolDTO>> {
    const data = await this.schoolRepo.listSchools(filter, options);

    const schoolsDTO = data.docs.map(school => SchoolMapper.toSchoolDTO(school));

    return {
      docs: schoolsDTO,
      meta: data.meta,
    };
  }
}
