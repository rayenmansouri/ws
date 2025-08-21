// // Enhanced DNC Types - Additional fields for DNC participants
// // This file contains only NEW fields that don't already exist in BaseUser or existing DNC types

// // Enums for dropdown options
// export enum ParentRelationEnum {
//   FATHER = "Père",
//   MOTHER = "Mère", 
//   GUARDIAN = "Tuteur",
//   OTHER = "Autre"
// }

// export enum CandidateOriginEnum {
//   BETI = "BETI",
//   RECOMMENDATION = "Recommandation", 
//   MDJ = "MDJ",
//   CDIS = "CdIS",
//   OTHER = "Autre"
// }

// export enum HousingSituationEnum {
//   WITH_PARENTS = "Vit chez ses parents",
//   WITH_GUARDIAN = "Vit chez son tuteur / sa tutrice",
//   RENTING = "Loue",
//   OTHER = "Autre situation"
// }

// export enum SocialSituationEnum {
//   INTERNALLY_DISPLACED = "Déplacé(e) interne",
//   DISABLED = "Personne en situation de handicap",
//   ORPHAN = "Orphelin(e)", 
//   UNEMPLOYED = "Désœuvré(e)",
//   OTHER = "Autre"
// }

// export enum MaritalStatusEnum {
//   SINGLE = "Célibataire",
//   MARRIED = "Marié(e)",
//   WIDOWED = "Veuf(ve)",
//   COHABITING = "Concubinage"
// }

// export enum TransportMeansEnum {
//   BICYCLE = "Vélo",
//   MOTORCYCLE = "Moto",
//   CAR = "Voiture", 
//   TAXI = "Taxi",
//   WALKING = "À pied",
//   BUS = "En bus",
//   OTHER = "Autre"
// }

// export enum EducationLevelEnum {
//   LICENCE = "Licence",
//   MASTER = "Master",
//   CAP = "CAP",
//   BTP = "BTP", 
//   BTS = "BTS",
//   OTHER = "Autre"
// }

// export enum ProfessionalStatusEnum {
//   JOB_SEEKING = "Recherche d'emploi",
//   TRAINING_SEEKING = "Recherche de formation",
//   ENTREPRENEURSHIP_SEEKING = "Recherche d'entrepreneuriat", 
//   RESUMING_STUDIES = "Reprise d'études",
//   OTHER = "Autre"
// }

// export enum EmploymentTypeEnum {
//   INTERNSHIP = "Stage",
//   FIXED_TERM = "CDD",
//   PERMANENT = "CDI",
//   CIVP = "CIVP",
//   WORK_STUDY = "Alternance", 
//   APPRENTICESHIP = "Apprentissage"
// }

// export enum AssociativeWorkEnum {
//   YES = "Oui",
//   NO = "Non", 
//   NOT_ANYMORE = "Plus actuellement"
// }

// // Professional Experience Type (repeatable)
// export type ProfessionalExperience = {
//   description: string; // Brief description
//   position: string; // Job title/position
//   sector: string; // Preferred sector
//   employer: string; // Company/employer name
//   durationMonths: number; // Duration in months
//   employmentType: EmploymentTypeEnum; // Type of employment
//   feedback: string; // Subjective feedback, experience, learnings
// };

// // Additional Training Type (repeatable)
// export type AdditionalTraining = {
//   name: string; // Training name
//   completed: boolean; // Whether training was completed
// };

// // Main Enhanced DNC Type with only NEW fields
// export type EnhancedDncType = {
//   // 1. Personal and Family Information (only missing fields)
//   firstNameArabic?: string; // Prénom (Arabe)
//   lastNameArabic?: string; // Nom (Arabe)
//   age?: number; // Calculated automatically from birthDate (read-only)
//   cin: string; // 8-digit CIN with validation
//   postalAddress?: string; // Adresse postale (if different from existing address fields)
//   postalCode?: string; // 4-digit postal code
//   parentGuardianName?: string; // Parent/guardian name
//   parentRelation?: ParentRelationEnum; // Relationship type
//   parentPhoneNumber?: string; // Parent/guardian phone (8 digits)
//   parentEmail?: string; // Parent/guardian email
//   candidateOrigin?: CandidateOriginEnum; // Origin of candidacy

//   // 2. Socio-economic Situation
//   housingSituation?: HousingSituationEnum; // Housing situation
//   householdSize?: number; // Number of people in household
//   socialSituation?: SocialSituationEnum; // Social situation
//   maritalStatus?: MaritalStatusEnum; // Marital status (if adult)
//   numberOfDependents?: number; // Number of dependent children
//   transportMeans?: TransportMeansEnum; // Means of transport
//   vulnerabilityScore?: number; // Vulnerability score (to be clarified)
//   socioEconomicComment?: string; // Free text comment

//   // 3. Educational Situation
//   lastClassAttended?: string; // Last class attended
//   lastDiploma?: string; // Last diploma obtained
//   attachedSchool?: string; // School of attachment (if enrolled)
//   schoolingStopped?: boolean; // Whether schooling was stopped
//   schoolingStopYear?: number; // Year schooling stopped
//   schoolingStopReason?: string; // Reason for stopping schooling
//   professionalTrainingCompleted?: boolean; // Professional training completed
//   trainingDomain?: string; // Training domain
//   lastEducationLevel?: EducationLevelEnum; // Last education/training level
//   professionalTrainingStopped?: boolean; // Professional training stopped
//   professionalTrainingStopYear?: number; // Year training stopped
//   professionalTrainingStopReason?: string; // Reason for stopping training
//   additionalTraining1?: AdditionalTraining; // First additional training
//   additionalTraining2?: AdditionalTraining; // Second additional training
//   educationalComment?: string; // Free text comment

//   // 4. Professional Situation at Entry
//   status?: ProfessionalStatusEnum; // Current status
//   jobSearchDurationMonths?: number; // Job search duration in months
//   inactivityDurationMonths?: number; // Inactivity duration in months
//   associativeWork?: AssociativeWorkEnum; // Associative work status
//   lifePriority?: string; // Priority in life
//   passion?: string; // Passion
//   preferredJob?: string; // Preferred job
//   preferredSector?: string; // Preferred sector

//   // 5. Professional Experience (array for multiple experiences)
//   professionalExperiences?: ProfessionalExperience[]; // Array of professional experiences
// };

// // Complete DNC User Type (combining base + existing DNC + enhanced fields)
// export type CompleteDncUser = {
//   // This would be the combination of BaseUser + existing dncType + EnhancedDncType
//   // Left as a reference for how to combine all types when needed
// };
