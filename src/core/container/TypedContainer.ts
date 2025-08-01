import {
  Container,
  interfaces,
  // eslint-disable-next-line no-restricted-imports
  inject as inversifyInject,
} from "inversify";

import { containerRegistry } from "./containerRegistry";

export class TypedContainer extends Container {
  bind<T>(
    serviceId: string,
  ): interfaces.BindingToSyntax<T> {
    return super.bind(serviceId);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  get(serviceId: string): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return super.get(serviceId);
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
