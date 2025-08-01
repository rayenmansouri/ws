import { UserTypeEnum } from "../../factory/enums";

export type CreateBaseUser = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  schoolSubdomain: string;
  type: UserTypeEnum;
};

export type BaseUser = CreateBaseUser & {
  id: string
  passwordChangedAt: Date;
};

export class BaseUserEntity{
    public id: string;
    public schoolSubdomain: string;
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public email: string;
    public password: string;
    public type: UserTypeEnum;
    public passwordChangedAt: Date;
    constructor(
       json:any
    ){
        this.id = json.id;
        this.schoolSubdomain = json.schoolSubdomain;
        this.firstName = json.firstName;
        this.lastName = json.lastName;
        this.fullName = json.fullName;
        this.email = json.email;
        this.password = json.password;
        this.type = json.type;
        this.passwordChangedAt = json.passwordChangedAt; 
   }
    
    toJSON(): BaseUser {
        return {
            id: this.id,
            schoolSubdomain: this.schoolSubdomain,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.fullName,
            email: this.email,
            password: this.password,
            type: this.type,
            passwordChangedAt: this.passwordChangedAt
        };
    }

    isMaster(): boolean {
        return this.type === UserTypeEnum.MASTER;
    }


    needToLoginAgain(tokenExpires: number): boolean {
        return this.passwordChangedAt !== undefined && Math.floor(this.passwordChangedAt.getTime() / 1000) > tokenExpires;
    }
}