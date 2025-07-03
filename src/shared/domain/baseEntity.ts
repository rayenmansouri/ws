import { ID } from "./../value-objects/ID.vo";

export class BaseEntity {
  protected _id: ID;
  protected _newId: string;
  protected _createdAt: Date;
  protected _updatedAt: Date;

  constructor(props: {
    id: ID;
    newId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = props.id;
    this._newId = props.newId;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get id(): ID {
    return this._id;
  }

  get newId(): string {
    return this._newId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
