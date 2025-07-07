import { ID } from "./../value-objects/ID.vo";
import { Guard } from "./../utils/Guards";

export abstract class BaseEntity {
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
    Guard.againstInvalidObjectId(props.id.toString(), "Invalid id");
    Guard.againstEmptyString(props.newId, "Invalid newId");
    if (props.createdAt)
      Guard.againstInvalidDate(props.createdAt, "Invalid createdAt");
    if (props.updatedAt)
      Guard.againstInvalidDate(props.updatedAt, "Invalid updatedAt");
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
