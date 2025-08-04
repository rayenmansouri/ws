import { IRquestInterceptor } from "./interface";


const customInterceptorRegistry: Record<string, (new () => IRquestInterceptor)> = {};


export function createInterceptorDecorator(
    name:string,
    callback: (new () => IRquestInterceptor)
): void {
    customInterceptorRegistry[name] = callback;
}

export function getAllInterceptors(): (new () => IRquestInterceptor)[] {
    return Object.values(customInterceptorRegistry);
}