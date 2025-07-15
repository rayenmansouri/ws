import { injectable } from "inversify";
import { ID } from "../../../types/BaseEntity";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { IssueDTO } from "../dtos/issue.dto";
import { inject } from "../../../core/container/TypedContainer";
import { IssueRepo } from "../domain/Issue.repo";
import { IssueService } from "../domain/Issue.service";
import { ForbiddenError } from "../../../core/ApplicationErrors";
import { IssueMapper } from "../mappers/Issue.mapper";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { InteractionRepo } from "../domain/Interaction.repo";

@injectable()
export class GetOneIssueUseCase {
  constructor(
    @inject("IssueRepo") private issueRepo: IssueRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("InteractionRepo") private interactionRepo: InteractionRepo,
  ) {}

  async execute(
    issueNewId: string,
    userDetails: {
      userId: ID;
      userType: TEndUserEnum;
    },
  ): Promise<IssueDTO> {
    const issue = await this.issueRepo.findOneByNewIdOrThrow(issueNewId, "notFound.issue", {
      populate: ["studentProfile", "author", "teacher", "reason"],
    });

    if (
      !IssueService.isUserAllowedToViewIssue(userDetails, {
        author: issue.author._id,
        isForwarded: issue.isForwarded,
        teacher: issue.teacher?._id || null,
      })
    )
      throw new ForbiddenError("issue.accessDenied");

    const classId = issue.studentProfile.class;
    const classDoc = classId
      ? await this.classRepo.findOneByIdOrThrow(classId, "global.internalError")
      : null;

    const student = await this.studentRepo.findOneByIdOrThrow(
      issue.studentProfile.student,
      "global.internalError",
    );

    const lastInteractionId = issue.lastInteraction;
    const lastInteraction = lastInteractionId
      ? await this.interactionRepo.findOneByIdOrThrow(lastInteractionId, "global.internalError", {
          populate: ["actor", "sender", "target"],
        })
      : null;

    return IssueMapper.toIssueDTO({
      issue,
      classDoc,
      userType: userDetails.userType,
      lastInteraction,
      student,
    });
  }
}
