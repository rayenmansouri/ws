import { ID } from "../../../types/BaseEntity";
import { inject } from "../../../core/container/TypedContainer";
import { injectable } from "inversify";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";

export type UpdateTeacherConstraintsRequestDto = {
  teacherNewId: string;
  preferredClassroom: ID | null;
  maxDaysPerWeek: number | null;
  maxGapsPerDay: number | null;
  maxHoursPerDay: number | null;
};
@injectable()
export class UpdateTeacherConstraintsUseCase {
  constructor(
    @inject("TeacherRepo") private readonly teacherRepo: TeacherRepo,
    @inject("ClassroomRepo") private readonly classroomRepo: ClassroomRepo,
  ) {}

  async execute(dto: UpdateTeacherConstraintsRequestDto): Promise<void> {
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(
      dto.teacherNewId,
      "notFound.teacher",
    );

    if (dto.preferredClassroom && teacher.preferredClassroom !== dto.preferredClassroom)
      await this.classroomRepo.findOneByIdOrThrow(dto.preferredClassroom, "notFound.classroom");

    await this.teacherRepo.updateOneById(teacher._id, {
      preferredClassroom: dto.preferredClassroom,
      maxDaysPerWeek: dto.maxDaysPerWeek,
      maxGapsPerDay: dto.maxGapsPerDay,
      maxHoursPerDay: dto.maxHoursPerDay,
    });
  }
}
