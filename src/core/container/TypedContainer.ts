import {
  Container,
  interfaces,
  // eslint-disable-next-line no-restricted-imports
  inject as inversifyInject,
} from "inversify";

import { containerRegistry } from "./containerRegistry";

export class TypedContainer extends Container {
  //@ts-expect-error - This is a valid override because the implementation is the same
  bind<K extends keyof containerRegistry>(
    serviceId: K,
  ): interfaces.BindingToSyntax<containerRegistry[K]> {
    return super.bind<containerRegistry[K]>(serviceId);
  }

  //@ts-expect-error - This is a valid override because the implementation is the same
  get<K extends keyof containerRegistry>(serviceId: K): containerRegistry[K] {
    return super.get<containerRegistry[K]>(serviceId);
  }

  //@ts-expect-error - This is a valid override because the implementation is the same
  createChild(containerOptions?: interfaces.ContainerOptions): TypedContainer {
    return super.createChild(containerOptions);
  }
}

export function inject<K extends keyof containerRegistry>(
  serviceId: K,
): ReturnType<typeof inversifyInject> {
  return inversifyInject(serviceId);
}
