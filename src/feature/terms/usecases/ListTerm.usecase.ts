import { injectable } from "inversify/lib/inversify";
import { ListOptions } from "../../../types/types";
import { inject } from "../../../core/container/TypedContainer";
import { TermRepo } from "../repos/Term.repo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { Term } from "../domains/term.entity";

@injectable()
export class ListTermUseCase {
  constructor(@inject("TermRepo") private termRepo: TermRepo) {}

  async execute(
    query: Partial<{ name?: string } & ListOptions>,
  ): Promise<ResponseWithPagination<Term>> {
    return this.termRepo.list({ name: query.name, limit: query.limit, page: query.page });
  }
}
