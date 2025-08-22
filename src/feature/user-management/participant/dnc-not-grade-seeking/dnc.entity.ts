        import { Role } from "../../../roles/role.entity";
import { BaseUser, BaseUserEntity } from "../../base-user/domain/base-user.entity";
import { UserTypeEnum } from "../../factory/enums";
import { DncUser } from "../dnc/dnc.entity";

export type dncNotGradeSeekingType = {
    uniqueId: string;
    address1?: string;
    address2?: string; 
    parents?: string[];
    level?: string;
    classType?: string;
    DNC: string;
}

export type DncNotGradeSeekingUser = BaseUser & dncNotGradeSeekingType;


export class DncNotGradeSeekingParticipantEntity extends BaseUserEntity implements DncNotGradeSeekingUser {
    public id: string;
    public uniqueId: string;
    public address1?: string;
    public address2?: string; 
    public parents?: string[];
    public level?: string;
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public email: string;
    public phoneNumber: string;
    public password: string;
    public schoolSubdomain: string;
    public type: UserTypeEnum;
    public roles?: Role[];
    public passwordChangedAt?: Date;
    public avatar?: {
        link: string;
        name: string;
        path: string;
        uploadedAt: Date;
        size: number;
        mimeType: string;
    };
    public gender: string;
    public birthDate: Date;
    public classType?: string;
    public DNC: string;
    constructor(json: any) {
        super(json);
        this.id = json._id.toString();
        this.uniqueId = json.uniqueId;
        this.address1 = json.address1;
        this.address2 = json.address2;
        this.parents = json.parents;
        this.level = json.level;
        this.classType = json.classType;
        this.DNC = json.DNC;
        this.firstName = json.firstName;
        this.lastName = json.lastName;
        this.fullName = json.fullName;
        this.email = json.email;
        this.phoneNumber = json.phoneNumber;
        this.password = json.password;
        this.schoolSubdomain = json.schoolSubdomain;
        this.type = json.type;
        this.roles = json.roles;
        this.passwordChangedAt = json.passwordChangedAt;
        this.avatar = json.avatar;
        this.gender = json.gender;
        this.birthDate = json.birthDate;
    }
    toJSON(): DncUser {
        return {
            id: this.id,
            uniqueId: this.uniqueId,
            address1: this.address1,
            address2: this.address2,
            parents: this.parents,  
            level: this.level,
            classType: this.classType,
            DNC: this.DNC,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.fullName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            password: this.password,
            schoolSubdomain: this.schoolSubdomain,
            type: this.type,
            roles: this.roles,
            passwordChangedAt: this.passwordChangedAt,
            avatar: this.avatar,
            gender: this.gender,
            birthDate: this.birthDate,
        };
    }
}