export abstract class DomainEvent {
  public readonly occurredAt: Date;
  public readonly organizationSubdomain: string;

  constructor(organizationSubdomain: string) {
    this.organizationSubdomain = organizationSubdomain;
    this.occurredAt = new Date();
  }
}
