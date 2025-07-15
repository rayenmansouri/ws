import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SignatureRepo } from "../domain/Signature.repo";
import { FileManager } from "../../../core/fileManager/FileManager";

@injectable()
export class DeleteSignatureUseCase {
  constructor(
    @inject("SignatureRepo") private signatureRepo: SignatureRepo,
    @inject("FileManager") private fileManager: FileManager,
  ) {}

  async execute(signatureNewId: string): Promise<void> {
    const signature = await this.signatureRepo.findOneByNewIdOrThrow(
      signatureNewId,
      "notFound.signature",
    );

    await this.fileManager.deleteFiles([signature.image.public_id]);

    await this.signatureRepo.deleteOneByNewId(signatureNewId);
  }
}
