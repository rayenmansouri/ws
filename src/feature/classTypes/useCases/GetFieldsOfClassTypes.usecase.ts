import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { FieldOfClassTypeDTO } from "../dtos/classType.dto";
import { ClassTypeMapper } from "../mappers/classType.mapper";
import { ClassTypeRepo } from "../repo/ClassType.repo";

@injectable()
export class GetFieldsOfClassTypeUseCase {
  constructor(@inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo) {}
  async execute(classTypeNewId: string): Promise<FieldOfClassTypeDTO[]> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
      { populate: ["fields.subjects"] },
    );

    return classType.fields.map((field, i) => ClassTypeMapper.toFieldsOfClassTypeDTO(field, i));
  }
}
