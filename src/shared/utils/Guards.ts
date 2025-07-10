export class Guard {
  static againstNullOrUndefined(value: unknown, argumentName: string): void {
    if (value === null || value === undefined) {
      throw new Error(`${argumentName} is null or undefined`);
    }
  }

  static againstEmptyString(value: string, argumentName: string): void {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(`${argumentName} is empty`);
    }
  }

  static againstEmptyArray(value: unknown[], argumentName: string): void {
    if (value.length === 0) {
      throw new Error(`${argumentName} is empty`);
    }
  }

  static againstEmptyObject(
    value: Record<string, unknown>,
    argumentName: string
  ): void {
    if (Object.keys(value).length === 0) {
      throw new Error(`${argumentName} is empty`);
    }
  }

  static againstInvalidDate(value: Date, argumentName: string): void {
    if (isNaN(value.getTime())) {
      throw new Error(`${argumentName} is not a valid date`);
    }
  }
}
