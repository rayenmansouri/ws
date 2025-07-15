import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager, FileUploadPayload } from "../../../core/fileManager/FileManager";
import { ID } from "../../../types/BaseEntity";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { SignatureRepo } from "../domain/Signature.repo";
import { SignatureDto } from "../dtos/signature.dto";
import { SignatureMapper } from "../mappers/Signature.mapper";

@injectable()
export class AddSignatureUseCase {
  constructor(
    @inject("SignatureRepo") private signatureRepo: SignatureRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("FileManager") private fileManager: FileManager,
  ) {}

  async execute(data: {
    name: string;
    personName: string | null;
    image: FileUploadPayload;
    classTypes: ID[];
  }): Promise<SignatureDto> {
    await this.signatureRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    const image = await this.fileManager.uploadFile(data.image, "signatures");

    const classTypes = await this.classTypeRepo.findManyByIdsOrThrow(
      data.classTypes,
      "notFound.classType",
    );

    const signature = await this.signatureRepo.addOne({
      ...data,
      image: {
        name: image.name,
        mimeType: image.mimeType,
        url: image.link,
        date: image.uploadedAt,
        size: image.size,
        public_id: image.path,
      },
    });

    return SignatureMapper.toSignatureDto({ ...signature, classTypes });
  }
}
