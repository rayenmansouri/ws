import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (error, ctx) => {
  if (error.code === "too_small" && error.type === "array")
    return { message: `the ${error.path[0]} are not enough` };

  if (error.code === "too_big" && error.type === "array")
    return { message: `the number of ${error.path[0]} is too big` };
  if (error.code === "invalid_enum_value") return { message: `invalid ${error.path[0]}` };
  return { message: `${ctx.defaultError} at ${error.path[0]} ` };
};
z.setErrorMap(customErrorMap);
