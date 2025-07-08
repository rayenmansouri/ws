import { Guard } from "./../utils/Guards";

export class ID {
  private readonly _value: string;
  public static readonly ID_REGEX = /^[a-f\d]{24}$/i;

  private constructor(value: string) {
    this._value = value;
  }

  static create(value: string): ID {
    Guard.againstNullOrUndefined(value, ID.constructor.name);
    ID.validate(value);
    return new ID(value);
  }

  static validate(value: string): void {
    if (!ID.ID_REGEX.test(value)) {
      throw new Error("Invalid ID");
    }
  }

  equals(other: ID): boolean {
    return other instanceof ID && other._value === this._value;
  }

  toString(): string {
    return this._value;
  }
}
