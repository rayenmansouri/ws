import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { EntityDto } from "../../entity/dto/entity.dto";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { ClassroomRepo } from "../domains/classroom.repo";

type GetAvailableClassroomUseCaseDto = {
  startTime: Date;
  endTime: Date;
  sessionNewId?: string;
  excludedWeek?: "A" | "B";
};

@injectable()
export class GetAvailableClassroomUseCase {
  constructor(@inject("ClassroomRepo") private classroomRepo: ClassroomRepo) {}

  async execute(params: GetAvailableClassroomUseCaseDto): Promise<EntityDto[]> {
    const oppositeWeek = params.excludedWeek
      ? params.excludedWeek === "A"
        ? "B"
        : "A"
      : undefined;

    const availableClassrooms = await this.classroomRepo.getAvailableClassroomsInSession(
      params.startTime,
      params.endTime,
      params.sessionNewId,
      oppositeWeek,
    );

    return availableClassrooms.map(classroom => EntityMapper.toEntityDto(classroom));
  }
}
