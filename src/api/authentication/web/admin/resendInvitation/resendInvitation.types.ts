import { ResendInvitationValidation } from "./resendInvitation.validation";
import { ResendInvitationResponseDTO } from "../../../../../feature/authentication/useCases/ResendInvitation.usecase";

export type ResendInvitationRouteConfig = ResendInvitationValidation & { files: never };
export type ResendInvitationResponse = ResendInvitationResponseDTO[];
