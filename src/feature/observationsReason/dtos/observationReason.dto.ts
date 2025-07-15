import { ID } from "../../../types/BaseEntity";
import { TObservationUrgencyEnum } from "../domains/observationReason.entity";

export type ObservationReasonDTO = {
  _id: ID;
  newId: string;
  name: string;
  urgency: TObservationUrgencyEnum;
};
