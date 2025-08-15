export type VerificationCodeInput = {
    user: string;
    verificationCode: string;
    verificationCodeExpiresAt: Date;
    isUsed: boolean;
    userType: string;
}

export type VerificationCode = VerificationCodeInput & {
    id: string;
}

export class VerificationCodeDto implements VerificationCode {
    id: string;
    user: string;
    verificationCode: string;
    verificationCodeExpiresAt: Date;
    isUsed: boolean;
    userType: string;

    constructor(json: any) {
        this.id = json._id.toString();
        this.user = json.user;
        this.verificationCode = json.verificationCode;
        this.verificationCodeExpiresAt = json.verificationCodeExpiresAt;
        this.isUsed = json.isUsed;
        this.userType = json.userType;
    }
}
