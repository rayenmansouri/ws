import { BaseParticipant } from "../base-participant.entity";

export type DncParticipant = BaseParticipant & {
    dncParticipant: boolean;
} 