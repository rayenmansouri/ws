import { injectable } from "inversify/lib/inversify";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { inject } from "../../../core/container/TypedContainer";
import { ActivityDTO } from "../dtos/Activity.dto";
import { ActivityMapper } from "../mappers/Activity.mapper";

@injectable()
export class GetActivitiesOfClassTypeUseCase {
  constructor(@inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo) {}

  async execute(classTypeNewId: string): Promise<ActivityDTO[]> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
      {
        populate: ["activities.sessionType", "activities.subSubjectType", "activities.subjectType"],
      },
    );

    const response = classType.activities.map((activity, index) =>
      ActivityMapper.toActivityDTO(activity, index),
    );

    return response;
  }
}
