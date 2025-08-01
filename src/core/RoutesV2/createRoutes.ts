import { registerRoute } from "../express/registerRoute";
import { RouteConfiguration, TypedRequestOptions } from "../express/types";
import logger from "../Logger";

export function createRoutes<T extends TypedRequestOptions = TypedRequestOptions>(
    arr: RouteConfiguration<T, string>[]
): void {
    logger.info(`registered ${arr.length} routes`);
    for(const route of arr) {
        registerRoute()(route as RouteConfiguration<TypedRequestOptions, string>);
    }
}