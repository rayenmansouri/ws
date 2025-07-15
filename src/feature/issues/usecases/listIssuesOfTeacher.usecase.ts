import { injectable } from "inversify";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { IssueDTO } from "../dtos/issue.dto";
import { inject } from "../../../core/container/TypedContainer";
import { IssueRepo } from "../domain/Issue.repo";
import { IssueMapper } from "../mappers/Issue.mapper";
import { StudentRepo } from "../../students/domain/Student.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ID } from "../../../types/BaseEntity";
import { Student } from "../../students/domain/student.entity";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { InteractionRepo } from "../domain/Interaction.repo";
import { ListOptions } from "../../../types/types";
import { TIssuesStatusEnum } from "../domain/issue.entity";
import { ParentRepo } from "../../parents/domain/Parent.repo";

@injectable()
export class ListIssuesOfTeacherUseCase {
  constructor(
    @inject("IssueRepo") private issueRepo: IssueRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("InteractionRepo") private interactionRepo: InteractionRepo,
    @inject("ParentRepo") private parentRepo: ParentRepo,
  ) {}

  async execute(
    teacherId: ID,
    filter: {
      isSeen?: boolean;
      issueStatus?: TIssuesStatusEnum;
      issueReasonIds?: ID[];
      search?: string;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<IssueDTO>> {
    let authorIds: ID[] | undefined = undefined;

    if (filter.search) {
      const parents = await this.parentRepo.findManyByFullName(filter.search);
      authorIds = parents.map(parent => parent._id);
    }

    const issues = await this.issueRepo.listIssues(
      {
        teacherId,
        isSeen: filter.isSeen,
        issueReasonIds: filter.issueReasonIds,
        issueStatus: filter.issueStatus,
        authorIds,
      },
      options,
    );

    const studentIds = issues.docs.map(issue => issue.studentProfile.student);
    const classIds = issues.docs
      .filter(issue => issue.studentProfile.class !== null)
      .map(issue => issue.studentProfile.class as ID);
    const lastInteractionIds = issues.docs
      .filter(issue => issue.lastInteraction)
      .map(issue => issue.lastInteraction as ID);

    const students = await this.studentRepo.findManyByIds(studentIds);
    const classes = await this.classRepo.findManyByIds(classIds);
    const lastInteractions = await this.interactionRepo.findManyByIds(lastInteractionIds, {
      populate: ["actor", "sender", "target"],
    });

    const issuesDTO = issues.docs.map(issue => {
      const student = students.find(
        student => student._id === issue.studentProfile.student,
      ) as Student;

      const classDoc =
        classes.find(classDoc => classDoc._id === issue.studentProfile.class) || null;

      const lastInteraction =
        lastInteractions.find(interaction => interaction.issue === issue._id) || null;

      return IssueMapper.toIssueDTO({
        issue,
        student,
        classDoc,
        userType: END_USER_ENUM.TEACHER,
        lastInteraction,
      });
    });

    return {
      docs: issuesDTO,
      meta: issues.meta,
    };
  }
}
