import { injectable } from "inversify/lib/inversify";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { inject } from "../../../core/container/TypedContainer";
import { NotFoundError } from "../../../core/ApplicationErrors";

@injectable()
export class DeleteClassTypeActivityUseCase {
  constructor(@inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo) {}

  async execute(classTypeNewId: string, activityIndex: number): Promise<void> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
    );

    if (activityIndex < 0 || activityIndex >= classType.activities.length)
      throw new NotFoundError("notFound.activity");

    const newActivities = classType.activities.filter((_, index) => index !== activityIndex);

    await this.classTypeRepo.updateOneById(classType._id, { activities: newActivities });
  }
}
