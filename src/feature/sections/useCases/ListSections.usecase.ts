import { inject, injectable } from "inversify/lib/inversify";
import { SectionRepo } from "../repos/Section.repo";
import { ListOptions } from "../../../types/types";
import { SectionMapper } from "../mappers/section.mapper";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { SectionDto } from "../dtos/section.dto";

@injectable()
export class ListSectionsUseCase {
  constructor(@inject("SectionRepo") private sectionRepo: SectionRepo) {}

  async execute(
    query: { search?: string } & ListOptions,
  ): Promise<ResponseWithPagination<SectionDto>> {
    const sections = await this.sectionRepo.listSections(
      { search: query.search },
      { limit: query.limit, page: query.page, populate: ["subLevels"] },
    );

    const docs = sections.docs.map(section => SectionMapper.toSectionDto(section));

    return { docs, meta: sections.meta };
  }
}
