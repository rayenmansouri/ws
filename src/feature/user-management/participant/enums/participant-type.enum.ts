export enum ParticipantTypeEnum {
  YOUTH = 'YOUTH',
  ADULT_LEARNER = 'ADULT_LEARNER',
  TRAINEE = 'TRAINEE',
  INTERN = 'INTERN',
  VOLUNTEER = 'VOLUNTEER',
  BENEFICIARY = 'BENEFICIARY',
  REGULAR = 'REGULAR'
}

export const PARTICIPANT_TYPE_DISPLAY_NAMES = {
  [ParticipantTypeEnum.YOUTH]: 'Youth Participant',
  [ParticipantTypeEnum.ADULT_LEARNER]: 'Adult Learner',
  [ParticipantTypeEnum.TRAINEE]: 'Trainee',
  [ParticipantTypeEnum.INTERN]: 'Intern',
  [ParticipantTypeEnum.VOLUNTEER]: 'Volunteer',
  [ParticipantTypeEnum.BENEFICIARY]: 'Beneficiary',
  [ParticipantTypeEnum.REGULAR]: 'Regular Participant'
} as const;