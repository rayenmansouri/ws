import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { GroupRepo } from "../repos/Group.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ExamGradeRepo } from "../../examGrade/domain/tunisian/ExamGrade.repo";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { ObservationRepo } from "../../observations/domain/Observation.repo";
import { WeeklySessionRepo } from "../../weeklySessions/repos/WeeklySession.repo";
import { GradeBookObservationRepo } from "../../gradeBookObservation/GradeBookObservation.repo";
import { HomeworkRepo } from "../../homeworks/domain/Homework.repo";
import { PostRepo } from "../../announcements/repos/Post.repo";

@injectable()
export class DeleteGroupUseCase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("HomeworkRepo") private homeworkRepo: HomeworkRepo,
    @inject("ObservationRepo") private observationRepo: ObservationRepo,
    @inject("WeeklySessionRepo") private weeklySessionRepo: WeeklySessionRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
    @inject("PostRepo") private postRepo: PostRepo,
  ) {}

  async execute(groupNewId: string): Promise<void> {
    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group");

    if (group.students.length > 0) throw new BadRequestError("groupRules.groupHasStudent");

    const promises: Promise<void>[] = [];
    promises.push(this.examGradeRepo.deleteManyByGroup(group._id));
    promises.push(this.sessionRepo.deleteManyByGroup(group._id));
    promises.push(this.homeworkRepo.deleteManyByGroup(group._id));
    promises.push(this.observationRepo.deleteManyByGroup(group._id));
    promises.push(this.weeklySessionRepo.deleteManyByGroup(group._id));
    promises.push(this.gradeBookObservationRepo.deleteManyByGroup(group._id));
    promises.push(this.postRepo.removeGroup(group._id));
    promises.push(this.groupRepo.deleteOneById(group._id));
    await Promise.all(promises);
    return;
  }
}
