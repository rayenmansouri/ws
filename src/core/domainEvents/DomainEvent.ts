export abstract class DomainEvent {
  public readonly occurredAt: Date;
  public readonly schoolSubdomain: string;

  constructor(schoolSubdomain: string) {
    this.schoolSubdomain = schoolSubdomain;
    this.occurredAt = new Date();
  }
}
