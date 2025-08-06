import { BaseUser } from "../base-user/domain/base-user.entity";
import { ParticipantTypeEnum, ParticipantRoleEnum } from "./enums";

export type Participant = BaseUser & {
        participantType: ParticipantTypeEnum;
        participantRole: ParticipantRoleEnum;
        birthDate: string;                    // ISO date string
        age: number;                         // calculated from birthDate
        gender: 'Male' | 'Female';
        nationality: 'Lebanese' | 'Syrian' | 'Iraqi' | 'Other';
        validResidency: 'Yes' | 'No' | 'In Progress' | 'To Confirm' | 'Other';
      
        phoneNumber?: string;
        address?: string;
      
        isEnrolled?: 'Yes' | 'No';
        schoolType?: 'Public' | 'Private';
        schoolName?: string;
        schoolSchedule?: 'AM' | 'PM';
        foreignLanguage?: 'French' | 'English' | 'French and English';
        className?: string;
      
        fatherName?: string;
        motherName?: string;
        parentRelation?: 'Father' | 'Mother' | 'Guardian' | 'Other';
        parentPhone?: string;
        parentEmail?: string;
      
        housingSituation?: 'With Parents' | 'With Guardian' | 'Rented' | 'Other';
        householdSize?: number;               // 1 to 20
      
        socialStatus?: Array<'Disability' | 'Refugee' | 'Displaced' | 'None' | 'Other'>;
        transportMethod?: 'On Foot' | 'Car' | 'Taxi' | 'Bus' | 'Bicycle' | 'Other';
      
        vulnerabilityScore?: number;
        comments?: string;
      
        lastGradeAttended?: 
          | 'EB1' | 'EB2' | 'EB3' | 'EB4' | 'EB5' | 'EB6' | 'EB7' | 'EB8' | 'EB9' 
          | '10th Grade' | '11th Grade' | '12th Grade';
      
        schoolDroppedOut?: 'Yes' | 'No';
        schoolDropOutYear?: number;          // only if dropped out
        schoolDropOutReason?: string;        // only if dropped out
      
        vocationalTrainingDone?: 'Yes' | 'No';
        trainingField?: string;
        lastTrainingLevel?: 
          | 'EB1' | 'EB2' | 'EB3' | 'EB4' | 'EB5' | 'EB6' | 'EB7' | 'EB8' | 'EB9' 
          | '10th Grade' | '11th Grade' | '12th Grade'
          | 'Short Course' | 'CAP' | 'BP' | 'BT' | 'TS';
      
        trainingDroppedOut?: 'Yes' | 'No';
        trainingDropOutYear?: number;
        trainingDropOutReason?: string;
      
        otherTraining1?: {
          name: string;
          completed: 'Yes' | 'No';
        };
      
        otherTraining2?: {
          name: string;
          completed: 'Yes' | 'No';
        };
      
        professionalStatus?: 
          | 'Job Seeking' 
          | 'Awaiting Training' 
          | 'Discouraged' 
          | 'Reorienting' 
          | 'Other';
      
        jobSearchDurationMonths?: number;
        inactivityDurationMonths?: number;
      
        communityWork?: 'Yes' | 'No' | 'Not currently';
      
        enrollmentDate?: string;             // ISO date
        expectedExitDate?: string;           // ISO date
        actualExitDate?: string;             // ISO date
      
        followedModules?: string[];          // list of module names
      
        earlyExit?: 'Yes' | 'No';
        earlyExitReason?: string;
      
        currentSituation?: string;
      
        cohortDate?: string;                 // MM/YYYY format
      
        group?: '8-12' | '12-13' | '14-18' | 'Alumni';
        subGroup?: 'AM' | 'PM';
        subSubGroup?: 'Group 1' | 'Group 2';
      
        attendanceRate?: number;             // average attendance %
      
        healthStatus?: Array<
          | 'Physical Disability' 
          | 'Mental Disability' 
          | 'Sensory-Motor Disability' 
          | 'Attention Disorder' 
          | 'Learning Disorder' 
          | 'Hyperactivity' 
          | 'Chronic Illness' 
          | 'Other' 
          | 'None'
        >;
      
        keyEvents?: string;
      
        keySkillsScore?: number;             // 1 to 4 or similar scale
        lifeSkillsScore?: number;
        progressionComment?: string;
      
        lifeProjectStatus?: 'Under Construction' | 'Validated';
      
        projectStage?: 'To Deconstruct' | 'Under Construction' | 'To Consolidate' | 'Validated';
      
        RIASECType?: 'Realistic' | 'Investigative' | 'Artistic' | 'Social' | 'Enterprising' | 'Conventional';
      
        plannedStudies?: string;
        plannedJobs?: string;
        professionalOrientation?: string;
      
        sufficientSelfKnowledge?: 'Yes' | 'No';
        initialCareerChoice?: string;
        initialCareerChoiceCoherent?: 'Yes' | 'No';
      
        careerMotivation?: 
          | 'Parental Influence' 
          | 'Societal Influence' 
          | 'Economic Reasons' 
          | 'Lack of Knowledge' 
          | 'Personal Choice' 
          | 'Social Media' 
          | 'Other';
      
        academicDifficulties?: string;
        strongSubjects?: string;
      
        dropoutRisk?: 'Yes' | 'No';
      
        helpfulPointsForCareerChoice?: string;
        obstaclesForCareerChoice?: string;
      
        identifiedSkills?: string;
        talents?: string;
        aspirations?: string;
        priorities?: string;
      
        dominantIntelligence?: 
          | 'Linguistic'
          | 'Logical-Mathematical'
          | 'Spatial/Musical'
          | 'Kinesthetic'
          | 'Interpersonal'
          | 'Intrapersonal'
          | 'Naturalist';
      
        attractiveWorkshop?: string;
        interestingProfessionalFields?: string;
        desiredJobs?: string;
        possiblePaths?: string;
        strengthsAndOpportunities?: string;
        obstacles?: string;
      
        parentalSupport?: 'Yes' | 'No';
      
        nextAcademicPath?: 'Academic' | 'Technical Training' | 'University Training' | 'Short Course' | 'Other';
      
        postPathStatus?: 
          | 'Employed' 
          | 'Vocational Training' 
          | 'School Study' 
          | 'Higher Education' 
          | 'Not in Employment or Training';
      
        contactDate?: string;               // e.g. "M+1", "M+2" (months after exit)
        jobSector?: string;
        studyField?: string;
        targetedDiploma?: string;
}
      