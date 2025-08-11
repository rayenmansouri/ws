import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { TeacherProfileRepo } from "../../teachers/domain/TeacherProfile.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";
import { ClassRepo } from "../domain/Class.repo";
import { ClassService } from "../domain/Class.service";

type UnAssignTeacherFromSubjectUseCaseInput = {
  subjectTypeId: ID;
  classNewId: string;
};

@injectable()
export class UnAssignTeacherFromSubjectUseCase {
  constructor(
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
  ) {}

  async execute(input: UnAssignTeacherFromSubjectUseCaseInput): Promise<void> {
    const { subjectTypeId, classNewId } = input;

    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");

    const teacherId = ClassService.ensureTeacherCanBeRemovedFromSubjectClass(
      subjectTypeId,
      classDoc,
    );

    const newSubjectTeacherMap = {
      ...classDoc.subjectTeacherMap,
      [subjectTypeId]: null,
    };

    const updatedClass = await this.classRepo.updateOneById(classDoc._id, {
      subjectTeacherMap: newSubjectTeacherMap,
    });

    await this.weeklySessionRepo.unAssignTeacherFromWeeklySessionsOfSubjectTypeByClass(
      classDoc._id,
      subjectTypeId,
    );

    await this.sessionRepo.unAssignTeacherFromWaitingSessionOfSubjectType(
      classDoc._id,
      subjectTypeId,
    );

    const isTeacherStillTeachingInClass = ClassService.checkTeacherStillTeachingInClass(
      teacherId,
      updatedClass!,
    );

    if (!isTeacherStillTeachingInClass) {
      await this.teacherProfileRepo.removeClass(teacherId, classDoc._id);
    }
  }
}
