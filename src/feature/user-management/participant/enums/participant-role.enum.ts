export enum ParticipantRoleEnum {
  LEARNER = 'LEARNER',
  PEER_MENTOR = 'PEER_MENTOR',
  TEAM_LEADER = 'TEAM_LEADER',
  REPRESENTATIVE = 'REPRESENTATIVE',
  ASSISTANT = 'ASSISTANT',
  OBSERVER = 'OBSERVER',
  ACTIVE_MEMBER = 'ACTIVE_MEMBER'
}

export const PARTICIPANT_ROLE_DISPLAY_NAMES = {
  [ParticipantRoleEnum.LEARNER]: 'Learner',
  [ParticipantRoleEnum.PEER_MENTOR]: 'Peer Mentor',
  [ParticipantRoleEnum.TEAM_LEADER]: 'Team Leader',
  [ParticipantRoleEnum.REPRESENTATIVE]: 'Representative',
  [ParticipantRoleEnum.ASSISTANT]: 'Assistant',
  [ParticipantRoleEnum.OBSERVER]: 'Observer',
  [ParticipantRoleEnum.ACTIVE_MEMBER]: 'Active Member'
} as const;