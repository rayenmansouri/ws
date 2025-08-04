import { createParamDecorator } from "./create-param-decorator";

export const languageDecorator = createParamDecorator("language", (req) => {
    return req.language;
});