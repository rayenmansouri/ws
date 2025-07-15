import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { applyMapperToPaginatedResponse } from "../../../helpers/applyMapperToPaginatedResponse";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { TutorialRepo } from "../domain/Tutorial.repo";
import { TutorialDto } from "../dtos/tutorial.dto";
import { TutorialMapper } from "../mappers/tutorial.mapper";

type ListTutorialUseCaseInput = {
  search?: string;
} & ListOptions;

@injectable()
export class ListTutorialUseCase {
  constructor(@inject("TutorialRepo") private tutorialRepo: TutorialRepo) {}

  async execute(query: ListTutorialUseCaseInput): Promise<ResponseWithPagination<TutorialDto>> {
    const { search, page, limit } = query;
    const data = await this.tutorialRepo.list({
      search,
      page,
      limit,
    });

    return applyMapperToPaginatedResponse(data, TutorialMapper.toDto);
  }
}
