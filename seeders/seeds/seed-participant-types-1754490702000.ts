import { ISeeder } from "../interface";
import { ParticipantTypeEnum, ParticipantRoleEnum, PARTICIPANT_TYPE_DISPLAY_NAMES, PARTICIPANT_ROLE_DISPLAY_NAMES } from "../../src/feature/user-management/participant/enums";

// Create a simple schema for participant types and roles configuration
interface ParticipantTypeConfig {
  type: ParticipantTypeEnum;
  displayName: string;
  description: string;
  availableRoles: ParticipantRoleEnum[];
  defaultRole: ParticipantRoleEnum;
}

export default class SeedParticipantTypes implements ISeeder {
    participantTypesConfig: ParticipantTypeConfig[] = [
        {
            type: ParticipantTypeEnum.YOUTH,
            displayName: PARTICIPANT_TYPE_DISPLAY_NAMES[ParticipantTypeEnum.YOUTH],
            description: "Young participants typically aged 8-18 in youth programs",
            availableRoles: [
                ParticipantRoleEnum.LEARNER,
                ParticipantRoleEnum.PEER_MENTOR,
                ParticipantRoleEnum.TEAM_LEADER,
                ParticipantRoleEnum.REPRESENTATIVE
            ],
            defaultRole: ParticipantRoleEnum.LEARNER
        },
        {
            type: ParticipantTypeEnum.ADULT_LEARNER,
            displayName: PARTICIPANT_TYPE_DISPLAY_NAMES[ParticipantTypeEnum.ADULT_LEARNER],
            description: "Adult participants in learning and development programs",
            availableRoles: [
                ParticipantRoleEnum.LEARNER,
                ParticipantRoleEnum.PEER_MENTOR,
                ParticipantRoleEnum.ACTIVE_MEMBER
            ],
            defaultRole: ParticipantRoleEnum.LEARNER
        },
        {
            type: ParticipantTypeEnum.TRAINEE,
            displayName: PARTICIPANT_TYPE_DISPLAY_NAMES[ParticipantTypeEnum.TRAINEE],
            description: "Participants in vocational or skills training programs",
            availableRoles: [
                ParticipantRoleEnum.LEARNER,
                ParticipantRoleEnum.ASSISTANT,
                ParticipantRoleEnum.ACTIVE_MEMBER
            ],
            defaultRole: ParticipantRoleEnum.LEARNER
        },
        {
            type: ParticipantTypeEnum.INTERN,
            displayName: PARTICIPANT_TYPE_DISPLAY_NAMES[ParticipantTypeEnum.INTERN],
            description: "Participants in internship or work experience programs",
            availableRoles: [
                ParticipantRoleEnum.LEARNER,
                ParticipantRoleEnum.ASSISTANT,
                ParticipantRoleEnum.OBSERVER
            ],
            defaultRole: ParticipantRoleEnum.LEARNER
        },
        {
            type: ParticipantTypeEnum.VOLUNTEER,
            displayName: PARTICIPANT_TYPE_DISPLAY_NAMES[ParticipantTypeEnum.VOLUNTEER],
            description: "Volunteer participants contributing to programs",
            availableRoles: [
                ParticipantRoleEnum.ACTIVE_MEMBER,
                ParticipantRoleEnum.ASSISTANT,
                ParticipantRoleEnum.PEER_MENTOR
            ],
            defaultRole: ParticipantRoleEnum.ACTIVE_MEMBER
        },
        {
            type: ParticipantTypeEnum.BENEFICIARY,
            displayName: PARTICIPANT_TYPE_DISPLAY_NAMES[ParticipantTypeEnum.BENEFICIARY],
            description: "Direct beneficiaries of support programs",
            availableRoles: [
                ParticipantRoleEnum.LEARNER,
                ParticipantRoleEnum.ACTIVE_MEMBER
            ],
            defaultRole: ParticipantRoleEnum.LEARNER
        },
        {
            type: ParticipantTypeEnum.REGULAR,
            displayName: PARTICIPANT_TYPE_DISPLAY_NAMES[ParticipantTypeEnum.REGULAR],
            description: "Regular program participants with standard engagement",
            availableRoles: [
                ParticipantRoleEnum.LEARNER,
                ParticipantRoleEnum.ACTIVE_MEMBER,
                ParticipantRoleEnum.PEER_MENTOR,
                ParticipantRoleEnum.TEAM_LEADER
            ],
            defaultRole: ParticipantRoleEnum.LEARNER
        }
    ];

    participantRoles = Object.values(ParticipantRoleEnum).map(role => ({
        role,
        displayName: PARTICIPANT_ROLE_DISPLAY_NAMES[role],
        description: this.getRoleDescription(role)
    }));

    private getRoleDescription(role: ParticipantRoleEnum): string {
        const descriptions = {
            [ParticipantRoleEnum.LEARNER]: "Primary learning role for skill development and knowledge acquisition",
            [ParticipantRoleEnum.PEER_MENTOR]: "Supports and guides fellow participants in their learning journey",
            [ParticipantRoleEnum.TEAM_LEADER]: "Takes leadership responsibilities within group activities",
            [ParticipantRoleEnum.REPRESENTATIVE]: "Represents participant group in meetings and decision-making",
            [ParticipantRoleEnum.ASSISTANT]: "Provides assistance to coaches and program facilitators",
            [ParticipantRoleEnum.OBSERVER]: "Observes activities for learning or evaluation purposes",
            [ParticipantRoleEnum.ACTIVE_MEMBER]: "Actively participates in all program activities and initiatives"
        };
        return descriptions[role];
    }
    
    async seed(): Promise<void> {
        console.log("Seeding participant types and roles configuration");
        
        // In a real implementation, you might want to store these configurations
        // in the database for runtime access. For now, we'll just log them.
        
        console.log("Participant Types Configuration:");
        this.participantTypesConfig.forEach(config => {
            console.log(`- ${config.type}: ${config.displayName}`);
            console.log(`  Description: ${config.description}`);
            console.log(`  Available Roles: ${config.availableRoles.join(', ')}`);
            console.log(`  Default Role: ${config.defaultRole}`);
            console.log("");
        });

        console.log("Participant Roles:");
        this.participantRoles.forEach(role => {
            console.log(`- ${role.role}: ${role.displayName}`);
            console.log(`  Description: ${role.description}`);
            console.log("");
        });
        
        console.log("Participant types and roles seeded successfully!");
    }  
    
    async preSeed(): Promise<void> {
        console.log("Preparing participant types and roles seed");
        // In a real implementation, you might clean existing configuration here
    }
}