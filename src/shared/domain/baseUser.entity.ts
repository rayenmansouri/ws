import { FileUploadPayload } from "./FileManager";
import { ID } from "./../value-objects/ID.vo";
import { BaseEntity } from "./baseEntity";

export class BaseUser extends BaseEntity {
  protected _firstName: string;
  protected _lastName: string;
  protected _email: string;
  protected _avatar: FileUploadPayload;

  constructor(props: {
    id: ID;
    firstName: string;
    lastName: string;
    email: string;
    avatar: FileUploadPayload;
  }) {
    super({ id: props.id, newId: props.firstName });
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._email = props.email;
    this._avatar = props.avatar;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    if (!value || value.length < 2) throw new Error("Invalid name");
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    if (!value || value.length < 2) throw new Error("Invalid name");
    this._lastName = value;
  }

  get avatar(): FileUploadPayload {
    return this._avatar;
  }

  set avatar(value: FileUploadPayload) {
    this._avatar = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}
