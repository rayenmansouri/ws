import { model, Schema } from "mongoose";
import { createCompleteSchema } from "../../../core/database/schema";
import { VerificationCode } from "./verificationCode.entity";

export const VerificationCodeKey = "verificationCodes";
export const VerificationCodeSchema = createCompleteSchema<VerificationCode>({
    name: "verificationCodes",
    schemaDefinition: new Schema<VerificationCode>({
        user: { type: String, required: true },
        verificationCode: { type: String, required: true },
        verificationCodeExpiresAt: { type: Date, required: true },
        isUsed: { type: Boolean, required: true, default: false },
        userType: { type: String, required: true },
    })
});

export const VerificationCodeModel = model<VerificationCode>(VerificationCodeKey, VerificationCodeSchema);
