import { z } from "zod";
import { BaseParticipantSchema, baseParticipantSchema } from "../validations/base-participant.schema";
import { dncNotGradeSeekingType } from "./dnc.entity";

export const dncNonSeekingSchema = baseParticipantSchema.extend({
  uniqueId: z.string(),
  DNC: z.string(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  parents: z.array(z.string()).optional(),
}) satisfies z.ZodType<BaseParticipantSchema & dncNotGradeSeekingType>;