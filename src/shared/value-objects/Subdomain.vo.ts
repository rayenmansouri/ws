import { Guard } from "./../utils/Guards";

export class SubdomainVo {
  /**
   * SUBDOMAIN_REGEX enforces the following rules:
   * - Only alphanumeric characters and hyphens are allowed
   * - Cannot start or end with a hyphen
   * - Cannot contain consecutive hyphens
   * - Length must be between 3 and 63 characters
   *
   * Regex breakdown:
   * ^(?!-)(?!.*--)[a-z0-9-]{3,63}(?<!-)$
   * ^        : Start of string
   * (?!-)    : Must not start with a hyphen
   * (?!.*--) : Must not contain consecutive hyphens
   * [a-z0-9-]{3,63} : Allowed characters and length
   * (?<!-)$  : Must not end with a hyphen
   */
  public static readonly SUBDOMAIN_REGEX =
    /^(?!-)(?!.*--)[a-z0-9-]{3,63}(?<!-)$/i;
  public static readonly MIN_LENGTH = 3;
  public static readonly MAX_LENGTH = 63;

  private constructor(public readonly value: string) {
    this.validate(value);
  }

  static create(value: string): SubdomainVo {
    return new SubdomainVo(value);
  }

  private validate(value: string): void {
    Guard.againstEmptyString(value, SubdomainVo.name);
    if (
      value.length < SubdomainVo.MIN_LENGTH ||
      value.length > SubdomainVo.MAX_LENGTH
    ) {
      throw new Error(
        `Subdomain must be between ${SubdomainVo.MIN_LENGTH} and ${SubdomainVo.MAX_LENGTH} characters.`
      );
    }
    if (!SubdomainVo.SUBDOMAIN_REGEX.test(value)) {
      throw new Error(
        "Subdomain must contain only alphanumeric characters or hyphens, cannot start or end with a hyphen, and must not contain consecutive hyphens."
      );
    }
  }
  toString(): string {
    return this.value;
  }
}
