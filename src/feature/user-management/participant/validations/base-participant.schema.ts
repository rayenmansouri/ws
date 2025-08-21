import { z } from "zod";
import { BaseParticipant } from "../base-participant.entity";

export const baseParticipantSchema = z.object({

}) satisfies z.ZodType<BaseParticipant>;

export type BaseParticipantSchema = z.infer<typeof baseParticipantSchema>;
export { BaseParticipant };
