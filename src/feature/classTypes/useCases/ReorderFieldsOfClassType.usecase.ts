import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { BadRequestError, NotFoundError } from "../../../core/ApplicationErrors";
import { ClassTypeService } from "../domains/ClassType.service";

@injectable()
export class ReorderFieldsOfClassTypesUseCase {
  constructor(@inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo) {}

  async execute(classTypeNewId: string, oldRank: number, newRank: number): Promise<void> {
    if (oldRank === newRank) return;
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
    );

    if (classType.fields.length === 0) throw new BadRequestError("invalid.classType");

    if (newRank >= classType.fields.length) throw new BadRequestError("invalid.newRank");

    const field = classType.fields[oldRank] as (typeof classType.fields)[0] | undefined;

    if (!field) throw new NotFoundError("notFound.field");

    const updatedField = ClassTypeService.reorderArray(classType.fields, oldRank, newRank);

    await this.classTypeRepo.updateOneById(classType._id, { fields: updatedField });
  }
}
