import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { Classroom, ClassroomMetaData } from "./classroom.entity";

export abstract class ClassroomRepo extends BaseRepo<ClassroomMetaData> {
  abstract listClassrooms(
    filter: { name?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<ClassroomMetaData, "sessionTypes" | "subjectTypes">>>;

  abstract find(query: Partial<{ name: string }>, options: { limit: number }): Promise<Classroom[]>;

  abstract getAvailableClassroomsInSession(
    startTime: Date,
    endTime: Date,
    sessionNewId: string | undefined,
    excludedWeek: "A" | "B" | undefined,
  ): Promise<Classroom[]>;

  abstract getAvailableClassroomsInWeeklySession(query: {
    startTime: { day: number; timeStamps: number };
    endTime: { day: number; timeStamps: number };
    weeklySessionNewId: string | undefined;
    excludedWeek: "A" | "B" | undefined;
  }): Promise<Classroom[]>;
}
