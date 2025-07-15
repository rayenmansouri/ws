import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";

export type unArchiveTeacherUseCaseRequestDto = {
  teacherNewId: string;
};

@injectable()
export class UnArchiveTeacherUseCase {
  constructor(@inject("TeacherRepo") private teacherRepo: TeacherRepo) {}

  async execute(dto: unArchiveTeacherUseCaseRequestDto): Promise<void> {
    const teacher = await this.teacherRepo.findOneByNewIdOrThrow(
      dto.teacherNewId,
      "notFound.teacher",
    );

    if (!teacher.isArchived) throw new BadRequestError("teacher.alreadyUnArchived");

    await this.teacherRepo.updateOneById(teacher._id, {
      isArchived: false,
    });
  }
}
