import { injectable } from "inversify";
import { Constructor } from "../../types/utils";
import { DomainEvent } from "./DomainEvent";

import { EventHandler } from "./EventHandler";

type EventHandlerClass<T extends DomainEvent> = Constructor<EventHandler<T>> & {
  uuid?: string;
};

@injectable()
export class EventDispatcher {
  private eventHandlers: Map<string, EventHandlerClass<DomainEvent>[]> =
    new Map();

  public subscribeHandler<Event extends DomainEvent>(
    eventClass: Constructor<Event>,
    handler: EventHandlerClass<Event>
  ): void {
    const handlers = this.eventHandlers.get(eventClass.name) || [];
    handlers.push(handler);
    this.eventHandlers.set(eventClass.name, handlers);
  }

  public async dispatchEvent(event: DomainEvent): Promise<void> {
    const handlerClasses = this.eventHandlers.get(event.constructor.name);
    if (!handlerClasses) return;

    // await Sentry.startSpan(
    //   {
    //     name: `DomainEvent: ${event.constructor.name}`,
    //     op: "domain.event",
    //     attributes: {
    //       schoolSubdomain: event.schoolSubdomain,
    //       timestamp: new Date().toISOString(),
    //     },
    //     forceTransaction: true, // Ensures this span is treated as a transaction
    //   },
    //   async () => {
    //     for (const HandlerClass of handlerClasses) {
    //       const connection = await getNewTenantConnection(
    //         event.schoolSubdomain
    //       );
    //       const school = getSchoolFromSubdomain(event.schoolSubdomain)!;
    //       const childContainer = container.createChild();
    //       childContainer.bind("Connection").toConstantValue(connection);
    //       childContainer.bind("School").toConstantValue(school);

    //       const handlerName = HandlerClass.name;

    //       await Sentry.startSpan(
    //         {
    //           name: handlerName,
    //           op: "event.handler",
    //         },
    //         async (handlerSpan) => {
    //           try {
    //             // @ts-expect-error - Handler uuid can not be typed
    //             const handler = childContainer.get(
    //               HandlerClass.uuid
    //             ) as EventHandler<DomainEvent>;
    //             await handler.handle(event);
    //             handlerSpan.setStatus({ code: 1 });
    //           } catch (handlerError) {
    //             handlerSpan.setStatus({ code: 2 });
    //             handlerSpan.setAttribute(
    //               "error.message",
    //               (handlerError as Error)?.message
    //             );
    //             handlerSpan.setAttribute("handler", handlerName);

    //             Sentry.withScope((scope) => {
    //               scope.setContext("event", {
    //                 ...event,
    //                 schoolSubdomain: event.schoolSubdomain,
    //               });
    //               scope.setTag("event", event.constructor.name);
    //               scope.setTag("handler", handlerName);
    //               Sentry.captureException(handlerError);
    //             });
    //           }
    //         }
    //       );
    //     }
    //   }
    // );
  }
}
