import { TypedRequest } from "../express/types";

const customDocratorRegistry: Record<string, (ctx:any) => any> = {};


export function createParamDecorator(
    name:string,
    callback: <T>(req:TypedRequest) => T
): void {
    customDocratorRegistry[name] = callback;
}

export function getAllCustomDecorators(): (<T>(req:TypedRequest) => T)[] {
    return Object.values(customDocratorRegistry);
}

