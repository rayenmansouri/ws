import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";

export const OBSERVATION_URGENCY_ENUM = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;
export type TObservationUrgencyEnum =
  (typeof OBSERVATION_URGENCY_ENUM)[keyof typeof OBSERVATION_URGENCY_ENUM];

export interface IObservationReason extends IEntity {
  name: string;
  urgency: TObservationUrgencyEnum;
}

export const observationReasonSchema = createSchema<IObservationReason>({
  name: {
    type: String,
    unique: true,
  },
  urgency: {
    type: String,
  },
});
