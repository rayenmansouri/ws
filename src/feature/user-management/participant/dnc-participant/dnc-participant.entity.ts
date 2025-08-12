import { Participant } from "../base-participant.entity";

export type DncParticipant = Participant & {
    dncParticipant: boolean;
} 