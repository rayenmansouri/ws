import { UserTypeEnum } from "../../factory/enums";

export type CreateBaseUser = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  schoolSubdomain: string;
  type: UserTypeEnum;
  roles: string[];
  passwordChangedAt?: Date;
  avatar?: {
    link: string;
    name: string;
    path: string;
    uploadedAt: Date;
    size: number;
    mimeType: string;
  };
};

export type BaseUser = CreateBaseUser & {
  id: string
};

export class BaseUserEntity{
    public id: string;
    public schoolSubdomain: string;
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public email: string;
    public phoneNumber: string;
    public password: string;
    public type: UserTypeEnum;
    public passwordChangedAt?: Date;
    public roles: string[];
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
            avatar: this.avatar
        };
    }

    isMaster(): boolean {
        return this.type === UserTypeEnum.MASTER;
    }


    needToLoginAgain(tokenExpires: number): boolean {
        return this.passwordChangedAt !== undefined && Math.floor(this.passwordChangedAt.getTime() / 1000) > tokenExpires;
    }
}