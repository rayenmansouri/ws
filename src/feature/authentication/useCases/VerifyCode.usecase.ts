import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { VerificationCodeRepository } from "../domain/verificationCode.repo";
import { VerificationCode } from "../domain/verificationCode.entity";

type VerifyCodeRequest = {
    code: string;
    userId: string;
    userType: string;
};

@injectable()
export class VerifyCodeUseCase {
    constructor(
        @inject(VERIFICATION_CODE_REPOSITORY_IDENTIFIER) private verificationCodeRepo: VerificationCodeRepository
    ) {}

    async execute(request: VerifyCodeRequest): Promise<VerificationCode> {
        const { code, userId, userType } = request;

        const verificationCodeDoc = await this.verificationCodeRepo.findByUser(userId, userType);

        if (!verificationCodeDoc) {
            throw new Error("Verification code not found");
        }

        if (verificationCodeDoc.isUsed) {
            throw new Error("Verification code already used");
        }

        if (verificationCodeDoc.verificationCode !== code) {
            throw new Error("Invalid verification code");
        }

        const isCodeExpired = new Date() > verificationCodeDoc.verificationCodeExpiresAt;
        if (isCodeExpired) {
            throw new Error("Verification code expired");
        }

        // Mark the code as used
        await this.verificationCodeRepo.markAsUsed(verificationCodeDoc.id);

        return verificationCodeDoc;
    }
}
