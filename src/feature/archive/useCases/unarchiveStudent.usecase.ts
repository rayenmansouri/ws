import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { StudentRepo } from "../../students/domain/Student.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";

export type unArchiveStudentUseCaseRequestDto = {
  studentNewId: string;
};

@injectable()
export class UnArchiveStudentUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
  ) {}

  async execute(dto: unArchiveStudentUseCaseRequestDto): Promise<void> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(
      dto.studentNewId,
      "notFound.student",
    );

    if (!student.isArchived) throw new BadRequestError("student.alreadyUnArchived");

    const level = await this.levelRepo.findOneByIdOrThrow(student.level, "global.internalError");

    const studentProfile = await this.studentProfileRepo.getStudentProfileOfSchoolYear(
      student._id,
      level.currentSchoolYear._id,
    );

    if (!studentProfile) {
      await this.studentProfileRepo.addOne({
        student: student._id,
        schoolYear: level.currentSchoolYear._id,
        class: null,
        groups: [],
        classGroup: null,
        isExceptionallyPromoted: false,
      });
    }

    await this.studentRepo.updateOneById(student._id, {
      isArchived: false,
    });
  }
}
