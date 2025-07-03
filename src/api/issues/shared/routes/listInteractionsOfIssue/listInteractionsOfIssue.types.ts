import { InteractionDTO } from "../../../../../feature/issues/dtos/interaction.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListInteractionsOfIssueValidation } from "./listInteractionsOfIssue.validation";

export type ListInteractionsOfIssueRouteConfig = ListInteractionsOfIssueValidation & {
  files: never;
};
export type ListInteractionsOfIssueResponse = ResponseWithPagination<InteractionDTO>;
