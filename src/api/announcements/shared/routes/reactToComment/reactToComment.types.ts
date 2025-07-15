import { ReactionSummary } from "../../../../../feature/announcements/domain/Reactions.service";
import { ReactToCommentValidation } from "./reactToComment.validation";

export type ReactToCommentRouteConfig = ReactToCommentValidation & { files: never };
export type ReactToCommentResponse = ReactionSummary;
