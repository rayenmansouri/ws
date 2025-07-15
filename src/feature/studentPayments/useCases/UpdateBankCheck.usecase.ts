import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BankCheckRepo } from "../domain/BankCheck.repo";
import { TBankCheckStatus } from "../domain/bankCheck.entity";

type UpdateBankCheckUseCaseRequest = {
  fullName?: string;
  checkNumber?: string;
  phoneNumber?: string | null;
  bankName?: string;
  withdrawDate?: Date | null;
  status?: TBankCheckStatus;
};

@injectable()
export class UpdateBankCheckUseCase {
  constructor(@inject("BankCheckRepo") private bankCheckRepo: BankCheckRepo) {}

  async execute(bankCheckNewId: string, data: UpdateBankCheckUseCaseRequest): Promise<void> {
    const bankCheck = await this.bankCheckRepo.findOneByNewIdOrThrow(
      bankCheckNewId,
      "notFound.bankCheck",
    );

    if (data.checkNumber && data.checkNumber !== bankCheck.checkNumber)
      await this.bankCheckRepo.ensureFieldUniqueness(
        "checkNumber",
        data.checkNumber,
        "bankCheck.checkNumberAlreadyUsed",
      );

    await this.bankCheckRepo.updateOneById(bankCheck._id, data);
  }
}
