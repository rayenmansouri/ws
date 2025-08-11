import { injectable } from "inversify";
import { ID } from "../../../types/BaseEntity";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { TeacherProfileRepo } from "../../teachers/domain/TeacherProfile.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";
import { ClassRepo } from "../domain/Class.repo";
import { ClassService } from "../domain/Class.service";
import { inject } from "../../../core/container/TypedContainer";

type UnAssignTeacherFromSubSubjectParams = {
  subSubjectTypeId: ID;
  classNewId: string;
};

@injectable()
export class UnAssignTeacherFromSubSubjectUseCase {
  constructor(
    @inject("TeacherProfileRepo") private teacherProfileRepo: TeacherProfileRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
  ) {}

  async execute(params: UnAssignTeacherFromSubSubjectParams): Promise<void> {
    const { subSubjectTypeId, classNewId } = params;

    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");

    const teacherId = ClassService.ensureTeacherCanBeRemovedFromSubSubjectClass(
      subSubjectTypeId,
      classDoc,
    );

    const newSubSubjectTeacherMap = {
      ...classDoc.subSubjectTeacherMap,
      [subSubjectTypeId]: null,
    };

    const updatedClass = await this.classRepo.updateOneById(classDoc._id, {
      subSubjectTeacherMap: newSubSubjectTeacherMap,
    });

    await this.weeklySessionRepo.unAssignTeacherFromWeeklySessionsOfSubSubjectTypeByClass(
      classDoc._id,
      subSubjectTypeId,
    );

    await this.sessionRepo.unAssignTeacherFromWaitingSessionOfSubSubjectType(
      classDoc._id,
      subSubjectTypeId,
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
