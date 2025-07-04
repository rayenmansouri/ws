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

  static againstInvalidObjectId(value: string, argumentName: string): void {
    if (!/^[a-f\d]{24}$/i.test(value)) {
      throw new Error(`${argumentName} is not a valid MongoDB ObjectId`);
    }
  }
}
