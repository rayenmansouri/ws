import { Participant } from "../participant.entity";
import { ParticipantTypeEnum, ParticipantRoleEnum } from "../enums";

// Example of creating participants with different types and roles

export const createYouthParticipant = (): Partial<Participant> => {
  return {
    // Base user information would be inherited from BaseUser
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    
    // New participant classification fields
    participantType: ParticipantTypeEnum.YOUTH,
    participantRole: ParticipantRoleEnum.LEARNER,
    
    // Participant-specific fields
    birthDate: "2010-05-15",
    age: 14,
    gender: "Male",
    nationality: "Lebanese",
    validResidency: "Yes",
    group: "14-18",
    subGroup: "AM"
  };
};

export const createAdultLearnerParticipant = (): Partial<Participant> => {
  return {
    firstName: "Sarah",
    lastName: "Ahmad",
    email: "sarah.ahmad@example.com",
    
    // Adult learner with peer mentor role
    participantType: ParticipantTypeEnum.ADULT_LEARNER,
    participantRole: ParticipantRoleEnum.PEER_MENTOR,
    
    birthDate: "1985-03-22",
    age: 39,
    gender: "Female",
    nationality: "Syrian",
    validResidency: "Yes",
    vocationalTrainingDone: "Yes",
    trainingField: "Computer Skills"
  };
};

export const createTraineeParticipant = (): Partial<Participant> => {
  return {
    firstName: "Omar",
    lastName: "Hassan",
    email: "omar.hassan@example.com",
    
    // Trainee with assistant role
    participantType: ParticipantTypeEnum.TRAINEE,
    participantRole: ParticipantRoleEnum.ASSISTANT,
    
    birthDate: "1998-11-08",
    age: 25,
    gender: "Male",
    nationality: "Iraqi",
    validResidency: "In Progress",
    professionalStatus: "Awaiting Training"
  };
};

export const createVolunteerParticipant = (): Partial<Participant> => {
  return {
    firstName: "Layla",
    lastName: "Khalil",
    email: "layla.khalil@example.com",
    
    // Volunteer with active member role
    participantType: ParticipantTypeEnum.VOLUNTEER,
    participantRole: ParticipantRoleEnum.ACTIVE_MEMBER,
    
    birthDate: "1992-07-30",
    age: 31,
    gender: "Female",
    nationality: "Lebanese",
    validResidency: "Yes",
    communityWork: "Yes"
  };
};

// Example of role progression - a participant can change roles over time
export const promoteParticipantRole = (
  participant: Partial<Participant>,
  newRole: ParticipantRoleEnum
): Partial<Participant> => {
  return {
    ...participant,
    participantRole: newRole,
    // You might also update related fields based on the new role
  };
};

// Example usage:
export const participantExamples = () => {
  const youth = createYouthParticipant();
  console.log(`Created youth participant: ${youth.firstName} ${youth.lastName}`);
  console.log(`Type: ${youth.participantType}, Role: ${youth.participantRole}`);
  
  // Promote youth to team leader after showing leadership skills
  const promotedYouth = promoteParticipantRole(youth, ParticipantRoleEnum.TEAM_LEADER);
  console.log(`Promoted to: ${promotedYouth.participantRole}`);
  
  const adultLearner = createAdultLearnerParticipant();
  const trainee = createTraineeParticipant();
  const volunteer = createVolunteerParticipant();
  
  return {
    youth,
    promotedYouth,
    adultLearner,
    trainee,
    volunteer
  };
};