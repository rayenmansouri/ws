import { DomainEvent } from "./DomainEvent";

export interface EventHandler<Event extends DomainEvent> {
  handle(event: Event): Promise<void> | void;
}
