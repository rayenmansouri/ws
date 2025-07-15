import { ID } from "../../../types/BaseEntity";
import { inject } from "../../../core/container/TypedContainer";
import { injectable } from "inversify";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";

export type UpdateClassConstraintsRequestDto = {
  classNewId: string;
  preferredClassroom: ID | null;
  maxHoursPerDay: number | null;
  maxContinuousHours: number | null;
  maxGapsPerDay: number | null;
};
@injectable()
export class UpdateClassConstraintsUseCase {
  constructor(
    @inject("ClassRepo") private readonly classRepo: ClassRepo,
    @inject("ClassroomRepo") private readonly classroomRepo: ClassroomRepo,
  ) {}

  async execute(dto: UpdateClassConstraintsRequestDto): Promise<void> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(dto.classNewId, "notFound.teacher");

    if (dto.preferredClassroom)
      await this.classroomRepo.findOneByIdOrThrow(dto.preferredClassroom, "notFound.classroom");

    await this.classRepo.updateOneById(classDoc._id, {
      preferredClassroom: dto.preferredClassroom,
      maxHoursPerDay: dto.maxHoursPerDay,
      maxContinuousHours: dto.maxContinuousHours,
      maxGapsPerDay: dto.maxGapsPerDay,
    });
  }
}
