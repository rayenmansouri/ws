import { injectable } from "inversify";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";
import { ClassType } from "../../classTypes/repo/classType.entity";

export type UpdateClassTypeActivityRequest = {
  classTypeNewId: string;
  activityIndex: number;
  durationInMinutes?: number;
  sessionTypeId?: ID;
  perGroup?: boolean;
  week?: "A" | "B" | null;
};

@injectable()
export class UpdateClassTypeActivityUseCase {
  constructor(
    @inject("ClassTypeRepo") private readonly classTypeRepo: ClassTypeRepo,
    @inject("SessionTypeRepo") private readonly sessionTypeRepo: SessionTypeRepo,
  ) {}

  async execute(dto: UpdateClassTypeActivityRequest): Promise<void> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      dto.classTypeNewId,
      "notFound.classType",
    );

    if (dto.activityIndex >= classType.activities.length || dto.activityIndex < 0)
      throw new NotFoundError("notFound.activity");

    const activity = classType.activities[dto.activityIndex];

    if (dto.sessionTypeId)
      await this.sessionTypeRepo.findOneByIdOrThrow(dto.sessionTypeId, "notFound.sessionType");

    const updatePayload: ClassType["activities"][0] = activity;
    if (dto.durationInMinutes !== undefined)
      updatePayload.durationInMinutes = dto.durationInMinutes;
    if (dto.sessionTypeId !== undefined) updatePayload.sessionType = dto.sessionTypeId;
    if (dto.perGroup !== undefined) updatePayload.perGroup = dto.perGroup;
    if (dto.week !== undefined) updatePayload.week = dto.week;

    const newActivities = classType.activities.map((activity, index) => {
      if (index === dto.activityIndex) return updatePayload;
      return activity;
    });

    await this.classTypeRepo.updateOneById(classType._id, { activities: newActivities });
  }
}
