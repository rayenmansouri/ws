import { z } from "zod";
import { OBSERVATION_URGENCY_ENUM } from "../../../../database/schema/pedagogy/Performance/observationReason.schema";
import { validateDate } from "../../../../core/validator";

const terms = z.array(
  z.object({
    name: z.string(),
    rank: z.number(),
  }),
);

const schoolYears = z.array(
  z.object({
    name: z.string(),
    startDate: validateDate(),
    endDate: validateDate(),
    terms: z.array(z.number()).min(1),
    levelNumber: z.number(),
  }),
);

const levels = z.array(
  z.object({
    name: z.string(),
    currentSchoolYearNumber: z.number(),
    rank: z.number(),
    color: z.string(),
  }),
);

const subLevels = z.array(
  z.object({
    levelNumber: z.number(),
    name: z.string(),
    hasSections: z.boolean(),
    rank: z.number(),
  }),
);

const sections = z.array(
  z.object({
    name: z.string(),
    subLevelNumbers: z.array(z.number()).min(1),
  }),
);

const subjectTypes = z.array(
  z.object({
    name: z.string(),
  }),
);

const subSubjectTypes = z.array(
  z.object({
    name: z.string(),
  }),
);

const exam = z.object({
  examTypeNumber: z.number(),
  coefficient: z.number().positive(),
});

const subSubjectOfClassType = z.object({
  subSubjectTypeNumber: z.number(),
  coefficient: z.number().positive(),
  exams: z.array(exam),
  isIncludedInGradeBook: z.boolean(),
});

const subjectOfClassType = z.object({
  subjectTypeNumber: z.number(),
  hasSubSubjects: z.boolean(),
  coefficient: z.number().positive(),
  isIncludedInGradeBook: z.boolean(),
  subSubjects: z.array(subSubjectOfClassType).optional(),
  exams: z.array(exam),
});

const activity = z.object({
  subjectTypeNumber: z.number().optional(),
  subSubjectTypeNumber: z.number().optional(),
  durationInMinutes: z.number(),
  sessionTypeNumber: z.number(),
  week: z.enum(["A", "B"]).optional(),
  perGroup: z.boolean().optional(),
});

const classTypes = z.array(
  z.object({
    name: z.string(),
    subLevelNumber: z.number(),
    sectionNumber: z.number().optional(),
    nextClassTypeNumbers: z.array(z.number()).optional(),
    isTerminal: z.boolean(),
    capacity: z.number(),
    subjects: z.array(subjectOfClassType),
    fields: z.array(
      z.object({
        name: z.string(),
        subjectTypeNumbers: z.array(z.number()),
        coefficient: z.number().positive(),
      }),
    ),
    activities: z.array(activity),
    maxGapsPerWeekInMinutes: z.number(),
  }),
);

const examTypes = z.array(
  z.object({
    name: z.string(),
    rank: z.number(),
  }),
);

const sessionTypes = z.array(
  z.object({
    name: z.string(),
  }),
);

const observationReasons = z.array(
  z.object({
    name: z.string(),
    urgency: z.nativeEnum(OBSERVATION_URGENCY_ENUM),
  }),
);

const classrooms = z.array(
  z.object({
    name: z.string(),
    allSubjectTypes: z.boolean().optional(),
    allSessionTypes: z.boolean().optional(),
  }),
);

const groupTypes = z.array(
  z.object({
    name: z.string(),
    exams: z.array(exam),
    coefficient: z.number().positive().optional(),
    illustration: z.string().optional().default("DEFAULT"),
  }),
);

export const schoolConfigValidation = z.object({
  terms,
  schoolYears,
  levels,
  subLevels,
  sections,
  subjectTypes,
  subSubjectTypes,
  sessionTypes,
  classTypes,
  examTypes,
  observationReasons,
  classrooms,
  groupTypes,
});

export type TSchoolConfig = z.infer<typeof schoolConfigValidation>;
