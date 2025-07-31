import {
  Container,
  interfaces,
  // eslint-disable-next-line no-restricted-imports
  inject as inversifyInject,
} from "inversify";

import { containerRegistry } from "./containerRegistry";

export class TypedContainer extends Container {
  bind<K extends keyof containerRegistry>(
    serviceId: K,
  ): interfaces.BindingToSyntax<containerRegistry[K]> {
    return super.bind<containerRegistry[K]>(serviceId);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  get<K extends keyof containerRegistry>(serviceId: K): containerRegistry[K] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return super.get<containerRegistry[K]>(serviceId);
  }

  createChild(containerOptions?: interfaces.ContainerOptions): TypedContainer {
    return super.createChild(containerOptions);
  }
}

export function inject<K extends keyof containerRegistry>(
  serviceId: K,
): ReturnType<typeof inversifyInject> {
  return inversifyInject(serviceId);
}
