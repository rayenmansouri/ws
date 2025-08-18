import { z } from "zod";
import { BaseParticipantSchema, baseParticipantSchema } from "./base-participant.schema";
import { dncType } from "../dnc/dnc.entity";

export const dncSchema = baseParticipantSchema.extend({
  uniqueId: z.string(),
  DNC: z.string(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  parents: z.array(z.string()).optional(),
}) satisfies z.ZodType<BaseParticipantSchema & dncType>;

export type DncSchema = z.infer<typeof dncSchema>;  