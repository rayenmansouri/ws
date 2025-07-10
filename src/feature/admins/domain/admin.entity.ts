import { BaseUser } from "./../../../shared/domain/baseUser.entity";
import { ID } from "./../../../shared/value-objects/ID.vo";
import { GenerateMetaData } from "../../../core/populateTypes";
import { FileUploadPayload } from "../../../shared/domain/FileManager";

export class Admin extends BaseUser {
  constructor({
    id,
    firstName,
    lastName,
    avatar,
    email,
    isActive,
    passwordChangedAt,
  }: {
    id: ID;
    firstName: string;
    lastName: string;
    isActive: boolean;
    avatar: FileUploadPayload;
    email: string;
    passwordChangedAt: Date | null;
  }) {
    super({
      id,
      firstName,
      lastName,
      email,
      avatar,
      isActive,
      passwordChangedAt,
    });
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }
}

export type AdminMetaData = GenerateMetaData<Admin, never>;
