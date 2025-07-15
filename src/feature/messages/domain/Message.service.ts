import { ID } from "./../../../types/BaseEntity";

export class MessageDomainService {
  constructor() {}

  static isParticipant(participantIds: ID[], userId: ID): boolean {
    return participantIds.includes(userId);
  }
}
