import { BaseUser } from "./../../../shared/domain/baseUser.entity";
import { ID } from "./../../../shared/value-objects/ID.vo";

export class Admin extends BaseUser {
  private _isImpersonation: boolean;

  constructor(isImpersonation = false) {
    super({ id: ID.create(""), name: "", email: "" });
    this._isImpersonation = isImpersonation;
  }

  get isImpersonation(): boolean {
    return this._isImpersonation;
  }

  static fromObject(obj: { isImpersonation: boolean }): Admin {
    const { isImpersonation = false } = obj;
    return new Admin(isImpersonation);
  }
}

export type AdminMetaData = {
  entity: Admin;
  populatedFields: never;
};
