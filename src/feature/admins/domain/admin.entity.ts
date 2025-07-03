import { GenerateMetaData } from "../../../core/populateTypes";

import { Role } from "../../authorization/domain/role.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";

export class Admin extends BaseUser {
  private _roles: Role[];
  private _isImpersonation: boolean;

  constructor(baseUserProps: Omit<BaseUser, 'roles' | 'isImpersonation'>, roles: Role[] = [], isImpersonation = false) {
    super(baseUserProps);
    this._roles = roles;
    this._isImpersonation = isImpersonation;
  }

  get roles(): Role[] {
    return this._roles;
  }

  get isImpersonation(): boolean {
    return this._isImpersonation;
  }

  addRole(role: Role): void {
    if (!this._roles.some(r => r._id === role._id)) {
      this._roles.push(role);
    }
  }

  removeRole(roleId: string): void {
    this._roles = this._roles.filter(r => r._id !== roleId);
  }

  setImpersonation(status: boolean): void {
    this._isImpersonation = status;
  }

  static fromObject(obj: any): Admin {
    const { roles = [], isImpersonation = false, ...baseUserProps } = obj;
    return new Admin(baseUserProps, roles, isImpersonation);
  }
}
