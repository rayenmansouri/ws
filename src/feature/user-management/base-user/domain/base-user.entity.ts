import { UserTypeEnum } from "../../factory/enums";

export type BaseUser = {
  id: string
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  type: UserTypeEnum;
  tenantId: string;
};

export class BaseUserEntity implements BaseUser{
    constructor(
        public id: string,
        public tenantId: string,
        public firstName: string,
        public lastName: string,
        public fullName: string,
        public email: string,
        public password: string,
        public type: UserTypeEnum
    ){}

    static fromJSON(json: BaseUser): BaseUserEntity {
        return new BaseUserEntity(json.id, json.tenantId, json.firstName, json.lastName, json.fullName, json.email, json.password, json.type);
    }

    toJSON(): BaseUser {
        return {
            id: this.id,
            tenantId: this.tenantId,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.fullName,
            email: this.email,
            password: this.password,
            type: this.type
        };
    }

    isMaster(): boolean {
        return this.type === UserTypeEnum.MASTER;
    }
}