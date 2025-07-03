import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Term, TermMetaData } from "../../../feature/terms/domains/term.entity";
import { TermRepo } from "../../../feature/terms/repos/Term.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";

export class MongoTermRepo extends MongoBaseRepo<TermMetaData> implements TermRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "term", session);
  }

  async list(query: { name?: string } & ListOptions): Promise<ResponseWithPagination<Term>> {
    const filter: FilterQuery<Term> = {};

    if (query.name) filter.name = query.name;

    return this.findManyWithPagination(filter, query);
  }
}
