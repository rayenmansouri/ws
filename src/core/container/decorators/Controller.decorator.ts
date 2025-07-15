import { injectable as inversifyInjectable } from "inversify";

import { RandomUtils } from "../../../helpers/RandomUtils";
import { container } from "../container";
import { containerRegistry } from "../containerRegistry";

export function Controller() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: (new (...args: any[]) => any) & { uuid?: string }): void {
    target.uuid = RandomUtils.generateUUID();
    inversifyInjectable()(target);
    container.bind(target.uuid as keyof containerRegistry).to(target);
  };
}
