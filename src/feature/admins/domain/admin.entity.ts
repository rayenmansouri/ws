import { BaseUser } from "./../../../shared/domain/baseUser.entity";
import { ID } from "./../../../shared/value-objects/ID.vo";
import { GenerateMetaData } from "../../../core/populateTypes";
import { FileUploadPayload } from "../../../shared/domain/FileManager";

export class Admin extends BaseUser {
  private _isImpersonation: boolean;

  constructor({
    firstName,
    lastName,
    isImpersonation,
    avatar,
  }: {
    firstName: string;
    lastName: string;
    isImpersonation: boolean;
    avatar: FileUploadPayload;
  }) {
    super({
      id: ID.create(""),
      firstName,
      lastName,
      email: "",
      avatar,
    });
    this._isImpersonation = isImpersonation;
  }

  get isImpersonation(): boolean {
    return this._isImpersonation;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }
}

export type AdminMetaData = GenerateMetaData<Admin, never>;
