import { ZodTypeAny } from "zod";
import { NextFunction, Response, Router } from "express";
import { END_USER_ENUM } from "../../constants/globalEnums";
import { TLanguageEnum } from "../../translation/constants";
import { logCompilationErrorAndExitProcess } from "../logErrorAndExitProcess";
import { BadRequestError } from "./../../shared/Application/Error";
import { DEFAULT_LANGUAGE, LANGUAGE_ENUM } from "./../../translation/constants";
import { multiTenantAuthMiddleware } from "./middleware/multiTenantAuthMiddleware";
import { parseQuery } from "./middlewares/queryValidation";
import { uploadMiddleware } from "./middlewares/upload";
import { VALIDATION_SOURCE } from "./middlewares/validateSchema";
import { RouteConfiguration, TypedRequest, TypedRequestOptions } from "./types";
import { Middleware } from "./types";
import { disableUploadMiddleware } from "./middlewares/upload";
import { TValidationSourceEnum } from "./middlewares/validateSchema";
import multer, { Field } from "multer";
import { fromZodError } from "zod-validation-error";
import Logger from "../Logger";

export class RouteFactory {
  constructor(private router: Router) {}

  public register<Options extends TypedRequestOptions, Path extends string>(
    ...routeConfigs: RouteConfiguration<Options, Path>[]
  ): void {
    for (const routeConfig of routeConfigs) {
      const middlewares = this.buildMiddlewareChain(routeConfig);
      this.router[routeConfig.method](routeConfig.path, ...middlewares);
    }
  }

  private buildMiddlewareChain<
    Options extends TypedRequestOptions,
    Path extends string
  >(routeConfig: RouteConfiguration<Options, Path>): Middleware[] {
    const middlewares: Middleware[] = [];

    middlewares.push(this.languageDetectionMiddleware);

    // 2. Upload
    if (!routeConfig.upload) {
      middlewares.push(this.disableUploadMiddleware);
    } else {
      middlewares.push(
        uploadMiddleware(
          routeConfig.upload.fields as Field[],
          routeConfig.upload.options
        )
      );
    }

    // 3. Validation
    if (routeConfig.bodySchema)
      middlewares.push(
        this.validateSchemaMiddleware(
          routeConfig.bodySchema,
          VALIDATION_SOURCE.BODY
        )
      );
    if (routeConfig.paramSchema) {
      this.validateParamSchemaAndPath(
        routeConfig.paramSchema,
        routeConfig.path
      );
      middlewares.push(
        this.validateSchemaMiddleware(
          routeConfig.paramSchema,
          VALIDATION_SOURCE.PARAM
        )
      );
    }
    if (routeConfig.querySchema) {
      middlewares.push(parseQuery);
      middlewares.push(
        this.validateSchemaMiddleware(
          routeConfig.querySchema,
          VALIDATION_SOURCE.QUERY
        )
      );
    }

    // 4. Auth & Multi-tenancy
    if (!routeConfig.isPublic) {
      if (!routeConfig.endUser) {
        logCompilationErrorAndExitProcess(
          new Error("End user is required when the route is not public!")
        );
        return [];
      }
      if (routeConfig.endUser === END_USER_ENUM.MASTER) {
        middlewares.push(masterAuthentication);
      } else {
        middlewares.push(multiTenantAuthMiddleware);
      }
    }

    // 5. Authorization
    if (routeConfig.authorization) {
      if (
        routeConfig.endUser !== END_USER_ENUM.ADMIN &&
        routeConfig.endUser !== END_USER_ENUM.TEACHER
      ) {
        logCompilationErrorAndExitProcess(
          new Error(
            "Authorization can only be set when end user is admin or teacher"
          )
        );
      }
      middlewares.push(
        authorize(
          routeConfig.authorization.action,
          routeConfig.authorization.resource
        )
      );
    }

    // 6. Controller (with/without transaction)
    if (routeConfig.isTransactionEnabled) {
      const controller = controllerWithTransaction(routeConfig.controller);
      middlewares.push(
        AsyncHandlerForController(
          controller,
          routeConfig.translations,
          routeConfig.endUser
        )
      );
    } else {
      middlewares.push(
        AsyncHandlerForController(
          routeConfig.controller,
          routeConfig.translations,
          routeConfig.endUser
        )
      );
    }

    return middlewares;
  }

  private validateParamSchemaAndPath(paramSchema: any, path: string): void {
    // ...same logic as before, can be extracted from your current implementation
  }

  private languageDetectionMiddleware(
    req: TypedRequest,
    _: Response,
    next: NextFunction
  ): void {
    const extractedLanguage = req.headers["content-language"];

    if (!extractedLanguage) {
      req.language = DEFAULT_LANGUAGE;
      next();
      return;
    }

    if (
      !Object.values(LANGUAGE_ENUM).includes(extractedLanguage as TLanguageEnum)
    )
      throw new BadRequestError("Invalid language");

    req.language = extractedLanguage as TLanguageEnum;

    next();
  }

  private disableUploadMiddleware(
    _: TypedRequest,
    __: Response,
    next: NextFunction
  ): void {
    multer().none() as Middleware;
    next();
  }

  private validateSchemaMiddleware(
    schema: ZodTypeAny,
    source: TValidationSourceEnum = VALIDATION_SOURCE.BODY
  ) {
    return (req: TypedRequest, _: Response, next: NextFunction): void => {
      const result = schema.safeParse(req[source]);
      if (!result.success) {
        const error = fromZodError(result.error, {
          maxIssuesInMessage: 3,
          includePath: false,
        })
          .message.replace(/"([^"]*)"/g, "$1")
          .replace("Validation error: ", "")
          .trimEnd();
        Logger.error(error);
        next(new BadRequestError(error));
        return;
      }
      req[source] = result.data;
      next();
    };
  }
}
