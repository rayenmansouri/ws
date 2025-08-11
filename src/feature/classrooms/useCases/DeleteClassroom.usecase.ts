import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassroomRepo } from "../domains/classroom.repo";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

@injectable()
export class DeleteClassroomUseCase {
  constructor(
    @inject("ClassroomRepo") private classroomRepo: ClassroomRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
  ) {}

  async execute(classroomNewId: string): Promise<void> {
    const classroom = await this.classroomRepo.findOneByNewIdOrThrow(
      classroomNewId,
      "notFound.classroom",
    );

    const sessionUseClassroom = await this.sessionRepo.findOneByClassroom(classroom._id);
    if (sessionUseClassroom) throw new BadRequestError("alreadyUsed.classroom");

    const weeklySessionUseClassroom = await this.weeklySessionRepo.findOneByClassroom(
      classroom._id,
    );
    if (weeklySessionUseClassroom) throw new BadRequestError("alreadyUsed.classroom");

    const classUseClassroom = await this.classRepo.findOneByPreferredClassroom(classroom._id);
    if (classUseClassroom) throw new BadRequestError("alreadyUsed.classroom");

    const teacherUseClassroom = await this.teacherRepo.findOneByPreferredClassroom(classroom._id);
    if (teacherUseClassroom) throw new BadRequestError("alreadyUsed.classroom");

    await this.classroomRepo.deleteOneById(classroom._id);
  }
}
