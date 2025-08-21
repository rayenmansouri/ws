import { Role } from "../../../roles/role.entity";
import { UserTypeEnum } from "../../factory/enums";
import { createUserValidationSchema } from "./validation.schema";
import { z } from "zod";

export type CreateBaseUser = z.infer<typeof createUserValidationSchema>;

export type BaseUser = Omit<CreateBaseUser, 'roles' | 'birthDate'> & {
  id: string;
  fullName: string;
  roles?: Role[]
  birthDate: Date;
};

export class BaseUserEntity implements BaseUser{
    public id: string;
    public schoolSubdomain: string;
    public gender: string;
    public birthDate: Date;
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public email: string;
    public phoneNumber: string;
    public password: string;
    public type: UserTypeEnum.ADMIN | UserTypeEnum.COACH | UserTypeEnum.PARTICIPANT | UserTypeEnum.MASTER;
    public passwordChangedAt?: Date;
    public roles?: Role[];
    public avatar?: {
      link: string;
      name: string;
      path: string;
      uploadedAt: Date;
      size: number;
      mimeType: string;
    };
    constructor(
       json:any
    ){
        this.id = json._id.toString();
        this.schoolSubdomain = json.schoolSubdomain;
        this.gender = json.gender;
        this.birthDate = json.birthDate;
        this.firstName = json.firstName;
        this.lastName = json.lastName;
        this.fullName = json.fullName;
        this.email = json.email;
        this.phoneNumber = json.phoneNumber;
        this.password = json.password;
        this.type = json.type;
        this.passwordChangedAt = json.passwordChangedAt; 
        this.roles = json.roles;
        this.avatar = json.avatar;
   }
    
    toJSON(): BaseUser {
        return {
            id: this.id,
            schoolSubdomain: this.schoolSubdomain,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.fullName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            password: this.password,
            type: this.type,
            passwordChangedAt: this.passwordChangedAt,
            roles: this.roles,
            avatar: this.avatar,
            gender: this.gender,
            birthDate: this.birthDate
        };
    }

    isMaster(): boolean {
        return this.type === UserTypeEnum.MASTER;
    }


    needToLoginAgain(tokenExpires: number): boolean {
        return this.passwordChangedAt !== undefined && Math.floor(this.passwordChangedAt.getTime() / 1000) > tokenExpires;
    }
}