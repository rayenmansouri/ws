import { BadRequestError } from "../../../core/ApplicationErrors";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BankTransferRepo } from "../../invoices/domain/BankTransfer.repo";

export type UpdateBankTransferRequestDto = {
  bankTransferNewId: string;
  fullName?: string;
  bankName?: string;
  transactionReference?: string;
};

@injectable()
export class UpdateBankTransferUseCase {
  constructor(@inject("BankTransferRepo") private readonly bankTransferRepo: BankTransferRepo) {}

  async execute(dto: UpdateBankTransferRequestDto): Promise<void> {
    const bankTransfer = await this.bankTransferRepo.findOneByNewIdOrThrow(
      dto.bankTransferNewId,
      "notFound.bankTransfer",
    );

    if (dto.transactionReference) {
      const duplicatedTransactionReference =
        await this.bankTransferRepo.findTransactionReferenceDuplication(
          bankTransfer._id,
          dto.transactionReference,
        );

      if (duplicatedTransactionReference)
        throw new BadRequestError("invoice.transactionReferenceAlreadyExists");
    }

    await this.bankTransferRepo.updateOneById(bankTransfer._id, {
      fullName: dto.fullName,
      bankName: dto.bankName,
      transactionReference: dto.transactionReference,
    });
  }
}
