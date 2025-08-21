import { UserTypeEnum } from "../../factory/enums";
import { z } from "zod";
import { dncSchema } from "../../participant/validations/dnc.schema";

// Base user fields shared by all user types
const baseUserFields = {
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    schoolSubdomain: z.string().min(1, "School subdomain is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    gender: z.string().min(1, "Gender is required"),
    birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Birth date must be in the format DD/MM/YYYY"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    roles: z.array(z.string()).optional(),
};

// Conditional validation schema using discriminated union
export const createUserValidationSchema = z.discriminatedUnion("type", [
    // For ADMIN and COACH - no participantData allowed
    z.object({
        ...baseUserFields,
        type: z.literal(UserTypeEnum.ADMIN),
    }),
    z.object({
        ...baseUserFields,
        type: z.literal(UserTypeEnum.COACH),
    }),
    // For PARTICIPANT - participantData is required
    z.object({
        ...baseUserFields,
        type: z.literal(UserTypeEnum.PARTICIPANT),
        participantData: dncSchema, // Now required for participants
    })
]);