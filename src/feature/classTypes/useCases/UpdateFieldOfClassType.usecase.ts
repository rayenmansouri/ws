import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError, NotFoundError } from "../../../core/ApplicationErrors";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { ClassTypeRepo } from "../repo/ClassType.repo";

@injectable()
export class UpdateFieldOfClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
  ) {}

  async execute(
    classTypeNewId: string,
    filedRank: number,
    data: Partial<{
      name: string;
      coefficient: number;
      subjectTypeNewIds: string[];
    }>,
  ): Promise<void> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
    );

    const field = classType.fields[filedRank];

    if (!field) throw new NotFoundError("notFound.field");

    const updatedField = { ...field };

    if (data.name) {
      const fieldNames = classType.fields.map(field => field.name);
      if (fieldNames.includes(data.name)) {
        throw new BadRequestError("alreadyUsed.name");
      }

      updatedField.name = data.name;
    }

    if (data.coefficient) updatedField.coefficient = data.coefficient;

    if (data.subjectTypeNewIds) {
      const subjectTypes = await this.subjectTypeRepo.findManyByNewIdsOrThrow(
        data.subjectTypeNewIds,
        "notFound.subjectType",
      );

      const subjectTypeIds = subjectTypes.map(subjectType => subjectType._id);

      const subjectTypeOfClassIds = classType.subjects.map(subject => subject.subjectType);

      subjectTypeIds.forEach(subjectTypeId => {
        if (!subjectTypeOfClassIds.includes(subjectTypeId)) {
          throw new NotFoundError("notFound.subject");
        }
      });

      updatedField.subjects = subjectTypeIds;
    }

    const fields = [...classType.fields];

    fields[filedRank] = updatedField;

    await this.classTypeRepo.updateOneById(classType._id, { fields });
  }
}
