import { Populate } from "../../../core/populateTypes";
import { SignatureMetaData } from "../domain/signature.entity";
import { SignatureDto } from "../dtos/signature.dto";

export class SignatureMapper {
  static toSignatureDto(signature: Populate<SignatureMetaData, "classTypes">): SignatureDto {
    return {
      _id: signature._id,
      newId: signature.newId,
      name: signature.name,
      personName: signature.personName,
      image: signature.image,
      classTypes: signature.classTypes.map(classType => ({
        _id: classType._id,
        newId: classType.newId,
        name: classType.name,
      })),
    };
  }
}
