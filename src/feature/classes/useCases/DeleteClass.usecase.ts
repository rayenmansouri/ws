import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../domain/Class.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";

import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

@injectable()
export class DeleteClassUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
  ) {}

  async execute(classNewId: string): Promise<void> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");

    const isEveryTopicWithoutTeacher = Object.values(classDoc.subjectTeacherMap)
      .concat(Object.values(classDoc.subSubjectTeacherMap))
      .every(value => value == null);

    if (!isEveryTopicWithoutTeacher) throw new BadRequestError("classRules.classHasTeacher");

    const students = classDoc.students;

    if (students.length > 0) throw new BadRequestError("classRules.classHasStudent");

    const promises: Promise<void>[] = [];
    promises.push(this.sessionRepo.deleteManyByClass(classDoc._id));
    promises.push(this.weeklySessionRepo.deleteManyByClass(classDoc._id));
    promises.push(this.classRepo.deleteOneById(classDoc._id));
    await Promise.all(promises);
  }
}
