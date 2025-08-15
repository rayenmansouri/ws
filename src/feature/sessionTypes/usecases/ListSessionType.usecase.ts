import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { SessionType } from "../domains/sessionType.entity";
import { SessionTypeRepo } from "../repos/SessionType.repo";

@injectable()
export class ListSessionTypeUseCase {
  constructor(@inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo) {}

  async execute(
    query: Partial<{ name: string } & ListOptions>,
  ): Promise<ResponseWithPagination<SessionType>> {
    const sessionTypes = await this.sessionTypeRepo.list(query);
    return sessionTypes;
  }
}
