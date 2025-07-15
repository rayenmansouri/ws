import { ID } from "./../../../types/BaseEntity";
import { injectable } from "inversify/lib/inversify";
import { UserMapper } from "./../../users/mappers/User.mapper";
import { inject } from "../../../core/container/TypedContainer";
import { SmsSoldHistoryRepo } from "../../schools/domain/SmsSoldHistory.repo";
import { ResponseWithPagination } from "./../../../newDatabase/mongo/types";
import { SmsSoldHistoryResponseDto } from "./../dto/alert.dto";

@injectable()
export class ListSmsSoldHistoriesUseCase {
  constructor(
    @inject("SmsSoldHistoryRepo") private readonly smsSoldHistoryRepo: SmsSoldHistoryRepo,
  ) {}

  async execute(
    tenantId: ID,
    page?: number,
    limit?: number,
  ): Promise<ResponseWithPagination<SmsSoldHistoryResponseDto>> {
    const paginatedResponse = await this.smsSoldHistoryRepo.listSmsSoldHistory(
      tenantId,
      page,
      limit,
    );

    const mappedDocs: SmsSoldHistoryResponseDto[] = paginatedResponse.docs.map(doc => {
      return {
        _id: doc._id,
        master: UserMapper.toUserProfileDTO(doc.master),
        smsCount: doc.smsCount,
        operation: doc.operation,
        operationIssuedAt: doc.addedAt,
      };
    });

    return {
      docs: mappedDocs,
      meta: paginatedResponse.meta,
    };
  }
}
