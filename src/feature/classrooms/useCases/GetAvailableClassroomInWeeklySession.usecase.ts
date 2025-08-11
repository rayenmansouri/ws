import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassroomRepo } from "../domains/classroom.repo";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { EntityDto } from "../../entity/dto/entity.dto";

type GetAvailableClassroomInWeeklySessionUseCaseDTO = {
  startTime: { day: number; hours: number; minutes: number };
  endTime: { day: number; hours: number; minutes: number };
  weeklySessionNewId?: string;
  week?: "A" | "B";
};

@injectable()
export class GetAvailableClassroomInWeeklySessionUseCase {
  constructor(@inject("ClassroomRepo") private classroomRepo: ClassroomRepo) {}

  async execute(query: GetAvailableClassroomInWeeklySessionUseCaseDTO): Promise<EntityDto[]> {
    const { startTime, endTime, week, weeklySessionNewId } = query;

    const startTimeStamp = startTime.hours * 60 + startTime.minutes;
    const endTimeStamp = endTime.hours * 60 + endTime.minutes;

    const oppositeWeek = week ? (week === "A" ? "B" : "A") : undefined;

    const availableClassrooms = await this.classroomRepo.getAvailableClassroomsInWeeklySession({
      startTime: { day: startTime.day, timeStamps: startTimeStamp },
      endTime: { day: endTime.day, timeStamps: endTimeStamp },
      weeklySessionNewId,
      excludedWeek: oppositeWeek,
    });

    return availableClassrooms.map(classroom => EntityMapper.toEntityDto(classroom));
  }
}
