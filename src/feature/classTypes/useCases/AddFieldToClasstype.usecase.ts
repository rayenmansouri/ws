import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { Types } from "mongoose";
import { ID } from "../../../types/BaseEntity";

@injectable()
export class AddFieldToClasstypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("SubjectTypeRepo") private subjectTypesRepo: SubjectTypeRepo,
  ) {}

  async execute(
    classTypeNewId: string,
    data: { name: string; subjectTypeNewIds: string[]; coefficient: number },
  ): Promise<void> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
    );

    const fieldsName = classType.fields.map(field => field.name);

    if (fieldsName.includes(data.name)) throw new BadRequestError("alreadyUsed.fieldName");
    const subjectTypes = await this.subjectTypesRepo.findManyByNewIdsOrThrow(
      data.subjectTypeNewIds,
      "notFound.subjectType",
    );

    const subjectTypeOfClassTypeIds = classType.subjects.map(subject => subject.subjectType);

    subjectTypes.forEach(subjectType => {
      if (!subjectTypeOfClassTypeIds.includes(subjectType._id))
        throw new BadRequestError("invalid.subjectType");
    });

    const subjectTypeOfFieldIds = classType.fields.flatMap(field =>
      field.subjects.map(subject => subject),
    );

    subjectTypeOfFieldIds.forEach(subjectTypeOfClassType => {
      if (subjectTypes.find(subjectType => subjectType._id === subjectTypeOfClassType))
        throw new BadRequestError("alreadyUsed.subjectType");
    });

    const subjectTypeIds = subjectTypes.map(subject => subject._id);

    const newField = {
      _id: new Types.ObjectId().toString() as ID,
      name: data.name,
      subjects: subjectTypeIds,
      coefficient: data.coefficient,
    };

    const updatedFields = [...classType.fields, newField];

    await this.classTypeRepo.updateOneById(classType._id, { fields: updatedFields });
  }
}
