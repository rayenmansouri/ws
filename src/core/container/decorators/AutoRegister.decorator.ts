import "reflect-metadata";
import { injectable as inversifyInjectable } from "inversify";
import { container } from "../container";

export interface RegistrationMetadata {
  identifier: string;
}

export const REGISTRATION_METADATA_KEY = Symbol("registration_metadata");

export function Injectable(options: RegistrationMetadata) {
  return function (target: (new (...args: any[]) => unknown) & { identifier?: string }): void {
    // Store metadata on the class
    Reflect.defineMetadata(REGISTRATION_METADATA_KEY, options, target);

    // Apply inversify injectable decorator
    inversifyInjectable()(target);
    container.bind(options.identifier).to(target);
    // Store identifier on prototype instead of constructor
    target.identifier = options.identifier;
  };
}

