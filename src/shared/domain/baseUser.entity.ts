import { ID } from "./../value-objects/ID.vo";
import { BaseEntity } from "./baseEntity";

export class BaseUser extends BaseEntity {
  protected _name: string;
  protected _email: string;

  constructor(props: { id: ID; name: string; email: string }) {
    super({ id: props.id, newId: props.name });
    this._name = props.name;
    this._email = props.email;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!value || value.length < 2) throw new Error("Invalid name");
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}
