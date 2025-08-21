import { UserTypeEnum } from "../../factory/enums";
import { z } from "zod";
import { dncSchema } from "../../participant/validations/dnc.schema";
import { SeekingGradeParticipant } from "../../participant/enums";
import { dncNonSeekingSchema } from "../../participant/dnc-not-grade-seeking/dnc-non-seeking.validation";

// Base user fields shared by all user types
const baseUserFields = {
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    schoolSubdomain: z.string().min(1, "School subdomain is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    gender: z.string().min(1, "Gender is required"),
    avatar: z.object({
        link: z.string(),
        name: z.string(),
        path: z.string(),
        uploadedAt: z.date(),
        size: z.number(),
        mimeType: z.string(),
    }).optional(),
    birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Birth date must be in the format DD/MM/YYYY"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    roles: z.array(z.string()).optional(),
    passwordChangedAt: z.date().optional(),
};

// Conditional validation schema using discriminated union
export const createUserValidationSchema = z.union([
    // For ADMIN and COACH - no participantData allowed
    z.object({
        ...baseUserFields,
        type: z.literal(UserTypeEnum.ADMIN),
    }),
    z.object({
        ...baseUserFields,
        type: z.literal(UserTypeEnum.COACH),
    }),
    z.object({
        ...baseUserFields,
        type: z.literal(UserTypeEnum.MASTER),
    }),
    // For PARTICIPANT - use discriminated union on seekingGrade
    z.object({
        ...baseUserFields,
        type: z.literal(UserTypeEnum.PARTICIPANT),
    }).and(
        z.discriminatedUnion("seekingGrade", [
            z.object({
                ...dncSchema.shape,
                seekingGrade: z.literal(SeekingGradeParticipant.SEEKING_GRADE_PARTICIPANT),
            }),
            z.object({
                ...dncNonSeekingSchema.shape,
                seekingGrade: z.literal(SeekingGradeParticipant.NOT_SEEKING_GRADE_PARTICIPANT),
            })
        ])
    )
]);

// Infer TypeScript types from Zod schemas
export type BaseUserFields = z.infer<z.ZodObject<typeof baseUserFields>>;