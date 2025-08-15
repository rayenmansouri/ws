import { injectable } from "inversify";
import { EventDispatcher } from "./EventDispatcher";
import { inject } from "../container/TypedContainer";
import { NewUserAddedEvent } from "../../feature/users/domain/NewUserAdded.event";
import { SendWelcomeEmailHandler } from "../../feature/emailManager/handlers/SendWelcomeEmail.handler";
import { SendWelcomeSmsHandler } from "../../feature/smsManager/handlers/SendWelcomeSms.handler";

@injectable()
export class HandlerSubscriber {
  constructor(@inject("EventDispatcher") private readonly eventDispatcher: EventDispatcher) {}

  public subscribeHandlers(): void {
    this.eventDispatcher.subscribeHandler(NewUserAddedEvent, SendWelcomeEmailHandler);
    this.eventDispatcher.subscribeHandler(NewUserAddedEvent, SendWelcomeSmsHandler);
  }
}
