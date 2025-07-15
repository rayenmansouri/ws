import { ReactionSummary } from "../../../../../feature/announcements/domain/Reactions.service";
import { ReactToPostValidation } from "./reactToPost.validation";

export type ReactToPostRouteConfig = ReactToPostValidation & { files: never };
export type ReactToPostResponse = ReactionSummary;
