import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ID } from "./../../../types/BaseEntity";
import { startConversationRules } from "./../constants/conversation.constant";
import { CONVERSATION_ROLE, ConversationParticipant } from "./conversation.entity";

export class ConversationDomainService {
  constructor() {}

  static isUserAllowedToStartConversation(
    userType: TEndUserEnum,
    targetUserTypes: TEndUserEnum[],
  ): boolean {
    const allowedTargets = startConversationRules[userType];
    return targetUserTypes.every(target => allowedTargets.includes(target));
  }

  static isParticipant(userId: ID, participantIds: ID[]): boolean {
    return participantIds.includes(userId);
  }
  static isStartingConversationWithSelf(userId: ID, participantIds: ID[]): boolean {
    return participantIds.includes(userId);
  }
  static isParticipantDuplicated(participantIds: ID[]): boolean {
    const idSet = new Set<ID>();

    for (const id of participantIds) {
      if (idSet.has(id)) {
        return true;
      }
      idSet.add(id);
    }

    return false;
  }

  static hasMinimumParticipants(participantIds: ID[]): boolean {
    return participantIds.length > 2;
  }
  static hasAdminParticipant(participants: ConversationParticipant[]): boolean {
    return participants.some(participant => participant.role === CONVERSATION_ROLE.ADMIN);
  }

  static isParticipantHasAdminRoleInGroup(
    userId: ID,
    participants: ConversationParticipant[],
  ): boolean {
    return participants.some(
      participant => participant.user === userId && participant.role === CONVERSATION_ROLE.ADMIN,
    );
  }
}
