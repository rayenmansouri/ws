import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { TeacherRepo } from "../../teachers/domain/Teacher.repo";
import { IssueRepo } from "../domain/Issue.repo";
import { ID } from "./../../../types/BaseEntity";

export type assignTeacherToIssueRequestDto = {
  issueNewId: string;
  teacherId: ID;
  adminId: ID;
};

@injectable()
export class AssignTeacherToIssueUseCase {
  constructor(
    @inject("TeacherRepo") private readonly teacherRepo: TeacherRepo,
    @inject("IssueRepo") private readonly issueRepo: IssueRepo,
  ) {}

  async execute(dto: assignTeacherToIssueRequestDto): Promise<void> {
    const issuePromise = this.issueRepo.findOneByNewIdOrThrow(dto.issueNewId, "notFound.issue");
    const teacherPromise = this.teacherRepo.findUnArchivedTeacherByIds([dto.teacherId]);

    const [issue, teachers] = await Promise.all([issuePromise, teacherPromise]);

    await this.issueRepo.updateOneById(issue._id, {
      teacher: teachers[0]._id,
      adminParticipants: Array.from(new Set([...issue.adminParticipants, dto.adminId])),
    });
  }
}
