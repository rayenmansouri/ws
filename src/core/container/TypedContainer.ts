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

  get<T>(serviceId: string): T {
    return super.get(serviceId);
  }

  createChild(containerOptions?: interfaces.ContainerOptions): TypedContainer {
    return super.createChild(containerOptions);
  }
}

export function inject(
  serviceId: string,
): ReturnType<typeof inversifyInject> {
  return inversifyInject(serviceId);
}
