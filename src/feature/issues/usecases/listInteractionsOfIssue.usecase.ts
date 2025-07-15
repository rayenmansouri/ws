import { injectable } from "inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { PickFromEnum } from "../../../types/utils/enums.util";
import { InteractionRepo } from "../domain/Interaction.repo";
import { IssueRepo } from "../domain/Issue.repo";
import { IssueService } from "../domain/Issue.service";
import { InteractionDTO } from "../dtos/interaction.dto";
import { InteractionMapper } from "../mappers/Interaction.mapper";

@injectable()
export class ListInteractionsOfIssueUseCase {
  constructor(
    @inject("IssueRepo") private issueRepo: IssueRepo,
    @inject("InteractionRepo") private interactionRepo: InteractionRepo,
  ) {}

  async execute(
    issueNewId: string,
    userDetails: {
      userType: PickFromEnum<TEndUserEnum, "admin" | "parent" | "teacher">;
      userId: ID;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<InteractionDTO>> {
    const issue = await this.issueRepo.findOneByNewIdOrThrow(issueNewId, "notFound.issue");

    if (!IssueService.isUserAllowedToViewIssue(userDetails, issue))
      throw new BadRequestError("issue.accessDenied");

    const interactions = await this.interactionRepo.listInteractionsOfIssue(issue._id, options);

    const interactionsDTO = interactions.docs.map(interaction => {
      return InteractionMapper.toInteractionDTO(interaction);
    });

    if (options.page === 1)
      await this.issueRepo.updateViewStatusOfIssue(issue, userDetails.userType);

    return { docs: interactionsDTO, meta: interactions.meta };
  }
}
