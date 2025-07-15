import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { MasterRepo } from "../../masters/domain/Master.repo";
import { SchoolRepo } from "../domain/School.repo";
import { SmsSoldHistoryRepo } from "../domain/SmsSoldHistory.repo";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { BadRequestError } from "../../../core/ApplicationErrors";

export type UpdateSmsSoldRequestDto = {
  smsSold: number;
  operation: "plus" | "minus";
  tenantId: string;
  masterId: ID;
};

@injectable()
export class UpdateSmsSoldUseCase {
  constructor(
    @inject("SchoolRepo") private readonly schoolRepo: SchoolRepo,
    @inject("SmsSoldHistoryRepo") private readonly smsSoldHistoryRepo: SmsSoldHistoryRepo,
    @inject("MasterRepo") private readonly masterRepo: MasterRepo,
  ) {}

  async execute(dto: UpdateSmsSoldRequestDto): Promise<void> {
    const school = await this.schoolRepo.findOneByIdOrThrow(dto.tenantId as ID, "notFound.school");
    await this.masterRepo.findOneByIdOrThrow(dto.masterId, "notFound.master");

    if (dto.smsSold <= 0) throw new BadRequestError("Sold must be positive");

    const existingSmsSold = school.totalSmsSold;

    if (dto.operation == "plus")
      await this.schoolRepo.updateOneById(dto.tenantId as ID, {
        totalSmsSold: existingSmsSold + dto.smsSold,
      });
    else if (dto.operation === "minus") {
      if (existingSmsSold - dto.smsSold < 0)
        throw new BadRequestError("alert.cannotMinusThisSmsAmount");
      await this.schoolRepo.updateOneById(dto.tenantId as ID, {
        totalSmsSold: existingSmsSold - dto.smsSold,
      });
    }
    await this.smsSoldHistoryRepo.addOne({
      master: dto.masterId,
      smsCount: dto.smsSold,
      operation: dto.operation,
      addedAt: getCurrentTimeOfSchool(dto.tenantId),
      school: school._id,
    });
  }
}
