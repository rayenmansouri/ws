import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SignatureRepo } from "../domain/Signature.repo";
import { SignatureMapper } from "../mappers/Signature.mapper";
import { SignatureDto } from "../dtos/signature.dto";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";

@injectable()
export class ListSignaturesUseCase {
  constructor(@inject("SignatureRepo") private signatureRepo: SignatureRepo) {}

  async execute(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<SignatureDto>> {
    const signatures = await this.signatureRepo.list(filter, options);

    const docs = signatures.docs.map(doc => SignatureMapper.toSignatureDto(doc));

    return { docs, meta: signatures.meta };
  }
}
