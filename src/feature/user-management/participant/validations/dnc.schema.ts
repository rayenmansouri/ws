import { z } from "zod";
import { BaseParticipantSchema, baseParticipantSchema } from "./base-participant.schema";
import { dncType } from "../dnc/dnc.entity";

export const dncSchema = baseParticipantSchema.extend({
  sex: z.string(),
}) satisfies z.ZodType<BaseParticipantSchema & dncType>;

export type DncSchema = z.infer<typeof dncSchema>;  