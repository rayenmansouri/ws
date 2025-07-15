import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager, FileUploadPayload } from "../../../core/fileManager/FileManager";
import { ID } from "../../../types/BaseEntity";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { SignatureRepo } from "../domain/Signature.repo";

@injectable()
export class UpdateSignatureUseCase {
  constructor(
    @inject("SignatureRepo") private signatureRepo: SignatureRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("FileManager") private fileManager: FileManager,
  ) {}

  async execute(
    signatureNewId: string,
    data: Partial<{
      name: string;
      personName: string;
      image: FileUploadPayload;
      classTypes: ID[];
    }>,
  ): Promise<void> {
    const signature = await this.signatureRepo.findOneByNewIdOrThrow(
      signatureNewId,
      "notFound.signature",
    );
    if (data.name && signature.name != data.name)
      await this.signatureRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    let image = signature.image;
    if (data.image) {
      await this.fileManager.deleteFiles([signature.image.public_id]);

      const file = await this.fileManager.uploadFile(data.image, "signatures");

      image = {
        name: file.name,
        mimeType: file.mimeType,
        url: file.link,
        date: file.uploadedAt,
        public_id: file.path,
        size: file.size,
      };
    }

    if (data.classTypes)
      await this.classTypeRepo.findManyByIdsOrThrow(data.classTypes, "notFound.classType");

    await this.signatureRepo.updateOneById(signature._id, {
      ...data,
      image,
    });
  }
}
