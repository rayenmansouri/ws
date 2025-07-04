import { Guard } from "./../utils/Guards";

export class ID {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): ID {
    Guard.againstNullOrUndefined(value, ID.constructor.name);
    Guard.againstInvalidObjectId(value, ID.constructor.name);
    return new ID(value);
  }

  static isValid(value: string): boolean {
    return /^[a-f\d]{24}$/i.test(value);
  }

  equals(other: ID): boolean {
    return other instanceof ID && other._value === this._value;
  }

  toString(): string {
    return this._value;
  }

  get value(): string {
    return this._value;
  }
}
