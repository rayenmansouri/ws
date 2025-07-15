import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { InternalError, NotFoundError } from "../../../core/ApplicationErrors";

@injectable()
export class DeleteFieldFromClassTypeUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {}

  async execute(classTypeNewId: string, fieldIndex: number): Promise<void> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
      { populate: ["subLevel"] },
    );

    const field = classType.fields[fieldIndex] as (typeof classType.fields)[0] | undefined;

    if (!field) throw new NotFoundError("notFound.field");

    const classDoc = await this.classRepo.findGeneratedTermByClassTypeInSchoolYear(
      classType._id,
      classType.subLevel.level.currentSchoolYear._id,
    );

    if (classDoc) throw new NotFoundError("class.alreadyGenerated");

    const newFields = classType.fields.filter((_, index) => index !== fieldIndex);

    await this.classTypeRepo.updateOneById(classType._id, { fields: newFields });
  }
}
