import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../domain/Class.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";
import { GradeBookObservationRepo } from "../../gradeBookObservation/GradeBookObservation.repo";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { HomeworkRepo } from "../../homeworks/domain/Homework.repo";
import { ObservationRepo } from "../../observations/domain/Observation.repo";
import { ExamGradeRepo } from "../../examGrade/domain/tunisian/ExamGrade.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { PostRepo } from "../../announcements/repos/Post.repo";

@injectable()
export class DeleteClassUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("HomeworkRepo") private homeworkRepo: HomeworkRepo,
    @inject("ObservationRepo") private observationRepo: ObservationRepo,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
    @inject("PostRepo") private postRepo: PostRepo,
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
    promises.push(this.examGradeRepo.deleteManyByClass(classDoc._id));
    promises.push(this.sessionRepo.deleteManyByClass(classDoc._id));
    promises.push(this.homeworkRepo.deleteManyByClass(classDoc._id));
    promises.push(this.observationRepo.deleteManyByClass(classDoc._id));
    promises.push(this.weeklySessionRepo.deleteManyByClass(classDoc._id));
    promises.push(this.gradeBookObservationRepo.deleteManyByClass(classDoc._id));
    promises.push(this.postRepo.removeClass(classDoc._id));
    promises.push(this.classRepo.deleteOneById(classDoc._id));
    await Promise.all(promises);
  }
}
