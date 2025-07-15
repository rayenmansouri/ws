import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";

export const OBSERVATION_URGENCY_ENUM = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;
export type TObservationUrgencyEnum =
  (typeof OBSERVATION_URGENCY_ENUM)[keyof typeof OBSERVATION_URGENCY_ENUM];

export type ObservationReason = {
  name: string;
  urgency: TObservationUrgencyEnum;
} & BaseEntity;

export type ObservationReasonMetaData = GenerateMetaData<ObservationReason, never>;
