import { Schema } from "mongoose";

export const ParticipantSchema = new Schema({
  // Personal Information
  birthDate: { type: String, required: true }, // ISO date string
  age: { type: Number, required: true }, // calculated from birthDate
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  nationality: { type: String, enum: ['Lebanese', 'Syrian', 'Iraqi', 'Other'], required: true },
  validResidency: { type: String, enum: ['Yes', 'No', 'In Progress', 'To Confirm', 'Other'], required: true },
  
  phoneNumber: { type: String, required: false },
  address: { type: String, required: false },
  
  // Education Information
  isEnrolled: { type: String, enum: ['Yes', 'No'], required: false },
  schoolType: { type: String, enum: ['Public', 'Private'], required: false },
  schoolName: { type: String, required: false },
  schoolSchedule: { type: String, enum: ['AM', 'PM'], required: false },
  foreignLanguage: { type: String, enum: ['French', 'English', 'French and English'], required: false },
  className: { type: String, required: false },
  
  // Parent Information
  fatherName: { type: String, required: false },
  motherName: { type: String, required: false },
  parentRelation: { type: String, enum: ['Father', 'Mother', 'Guardian', 'Other'], required: false },
  parentPhone: { type: String, required: false },
  parentEmail: { type: String, required: false },
  
  // Housing Information
  housingSituation: { type: String, enum: ['With Parents', 'With Guardian', 'Rented', 'Other'], required: false },
  householdSize: { type: Number, min: 1, max: 20, required: false },
  
  // Social Status
  socialStatus: [{ type: String, enum: ['Disability', 'Refugee', 'Displaced', 'None', 'Other'] }],
  transportMethod: { type: String, enum: ['On Foot', 'Car', 'Taxi', 'Bus', 'Bicycle', 'Other'], required: false },
  
  vulnerabilityScore: { type: Number, required: false },
  comments: { type: String, required: false },
  
  // Academic History
  lastGradeAttended: { 
    type: String, 
    enum: ['EB1', 'EB2', 'EB3', 'EB4', 'EB5', 'EB6', 'EB7', 'EB8', 'EB9', '10th Grade', '11th Grade', '12th Grade'], 
    required: false 
  },
  
  schoolDroppedOut: { type: String, enum: ['Yes', 'No'], required: false },
  schoolDropOutYear: { type: Number, required: false },
  schoolDropOutReason: { type: String, required: false },
  
  // Vocational Training
  vocationalTrainingDone: { type: String, enum: ['Yes', 'No'], required: false },
  trainingField: { type: String, required: false },
  lastTrainingLevel: { 
    type: String, 
    enum: ['EB1', 'EB2', 'EB3', 'EB4', 'EB5', 'EB6', 'EB7', 'EB8', 'EB9', '10th Grade', '11th Grade', '12th Grade', 'Short Course', 'CAP', 'BP', 'BT', 'TS'], 
    required: false 
  },
  
  trainingDroppedOut: { type: String, enum: ['Yes', 'No'], required: false },
  trainingDropOutYear: { type: Number, required: false },
  trainingDropOutReason: { type: String, required: false },
  
  // Other Training
  otherTraining1: {
    name: { type: String, required: false },
    completed: { type: String, enum: ['Yes', 'No'], required: false }
  },
  
  otherTraining2: {
    name: { type: String, required: false },
    completed: { type: String, enum: ['Yes', 'No'], required: false }
  },
  
  // Professional Status
  professionalStatus: { 
    type: String, 
    enum: ['Job Seeking', 'Awaiting Training', 'Discouraged', 'Reorienting', 'Other'], 
    required: false 
  },
  
  jobSearchDurationMonths: { type: Number, required: false },
  inactivityDurationMonths: { type: Number, required: false },
  
  communityWork: { type: String, enum: ['Yes', 'No', 'Not currently'], required: false },
  
  // Program Information
  enrollmentDate: { type: String, required: false }, // ISO date
  expectedExitDate: { type: String, required: false }, // ISO date
  actualExitDate: { type: String, required: false }, // ISO date
  
  followedModules: [{ type: String }], // list of module names
  
  earlyExit: { type: String, enum: ['Yes', 'No'], required: false },
  earlyExitReason: { type: String, required: false },
  
  currentSituation: { type: String, required: false },
  
  cohortDate: { type: String, required: false }, // MM/YYYY format
  
  // Group Information
  group: { type: String, enum: ['8-12', '12-13', '14-18', 'Alumni'], required: false },
  subGroup: { type: String, enum: ['AM', 'PM'], required: false },
  subSubGroup: { type: String, enum: ['Group 1', 'Group 2'], required: false },
  
  attendanceRate: { type: Number, required: false }, // average attendance %
  
  // Health Status
  healthStatus: [{ 
    type: String, 
    enum: ['Physical Disability', 'Mental Disability', 'Sensory-Motor Disability', 'Attention Disorder', 'Learning Disorder', 'Hyperactivity', 'Chronic Illness', 'Other', 'None'] 
  }],
  
  keyEvents: { type: String, required: false },
  
  // Assessment Scores
  keySkillsScore: { type: Number, required: false }, // 1 to 4 or similar scale
  lifeSkillsScore: { type: Number, required: false },
  progressionComment: { type: String, required: false },
  
  // Life Project
  lifeProjectStatus: { type: String, enum: ['Under Construction', 'Validated'], required: false },
  
  projectStage: { type: String, enum: ['To Deconstruct', 'Under Construction', 'To Consolidate', 'Validated'], required: false },
  
  RIASECType: { type: String, enum: ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'], required: false },
  
  plannedStudies: { type: String, required: false },
  plannedJobs: { type: String, required: false },
  professionalOrientation: { type: String, required: false },
  
  // Career Choice
  sufficientSelfKnowledge: { type: String, enum: ['Yes', 'No'], required: false },
  initialCareerChoice: { type: String, required: false },
  initialCareerChoiceCoherent: { type: String, enum: ['Yes', 'No'], required: false },
  
  careerMotivation: { 
    type: String, 
    enum: ['Parental Influence', 'Societal Influence', 'Economic Reasons', 'Lack of Knowledge', 'Personal Choice', 'Social Media', 'Other'], 
    required: false 
  },
  
  academicDifficulties: { type: String, required: false },
  strongSubjects: { type: String, required: false },
  
  dropoutRisk: { type: String, enum: ['Yes', 'No'], required: false },
  
  helpfulPointsForCareerChoice: { type: String, required: false },
  obstaclesForCareerChoice: { type: String, required: false },
  
  // Skills and Aspirations
  identifiedSkills: { type: String, required: false },
  talents: { type: String, required: false },
  aspirations: { type: String, required: false },
  priorities: { type: String, required: false },
  
  dominantIntelligence: { 
    type: String, 
    enum: ['Linguistic', 'Logical-Mathematical', 'Spatial/Musical', 'Kinesthetic', 'Interpersonal', 'Intrapersonal', 'Naturalist'], 
    required: false 
  },
  
  attractiveWorkshop: { type: String, required: false },
  interestingProfessionalFields: { type: String, required: false },
  desiredJobs: { type: String, required: false },
  possiblePaths: { type: String, required: false },
  strengthsAndOpportunities: { type: String, required: false },
  obstacles: { type: String, required: false },
  
  parentalSupport: { type: String, enum: ['Yes', 'No'], required: false },
  
  // Academic Path
  nextAcademicPath: { type: String, enum: ['Academic', 'Technical Training', 'University Training', 'Short Course', 'Other'], required: false },
  
  postPathStatus: { 
    type: String, 
    enum: ['Employed', 'Vocational Training', 'School Study', 'Higher Education', 'Not in Employment or Training'], 
    required: false 
  },
  
  contactDate: { type: String, required: false }, // e.g. "M+1", "M+2" (months after exit)
  jobSector: { type: String, required: false },
  studyField: { type: String, required: false },
  targetedDiploma: { type: String, required: false }
});

