import { NextFunction, Response } from "express";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { IMiddlewareFunction } from "./interface";
import { container } from "../../container/container";
import { APIResponse } from "../../responseAPI/APIResponse";
import { BaseController } from "../controllers/BaseController";
import { REQUEST_TOKEN_IDENTIFIER } from "../constant";
import { getAllInterceptors } from "../../interceptors/create-interceptor-decorator";
import { IRquestInterceptor } from "../../interceptors/interface";
import { getAllCustomDecorators } from "../../decorator/create-param-decorator";


export class HandleRequestMiddleware implements IMiddlewareFunction {
  constructor(
    private routeConfig: RouteConfiguration<TypedRequestOptions, string> 
  ){
  }

  canActivate(): boolean {
    return true;
  }

async handleRequest(req: TypedRequest<TypedRequestOptions>, res: Response, next: NextFunction): Promise<void> {
    req.userType = this.routeConfig.endUser;
    const interceptors = getAllInterceptors();
    const intercepts: IRquestInterceptor[] = [];
    for(const interceptor of interceptors){
      const interceptorInstance = new interceptor();
      intercepts.push(interceptorInstance);
    }
    try {
      const requestContainer = container.createChild({ defaultScope: "Singleton" });
      //bind requests
      requestContainer.bind(REQUEST_TOKEN_IDENTIFIER).toConstantValue(req);
      req.container = requestContainer;
      //bind decorators
      const params = getAllCustomDecorators();
      for(const param of params){
        const paramInstance = param(req);
        requestContainer.bind(param.name).toConstantValue(paramInstance);
      }
      //execute interceptors
      for(const interceptor of intercepts){
        await interceptor.beforeExecution(req);
      }
      const controller = requestContainer.get<BaseController<TypedRequestOptions>>(
        this.routeConfig.controller.identifier as string,
      );
      const apiResponse = await controller.handle(req, res);
      if (apiResponse instanceof APIResponse) {
        apiResponse.setLanguage(req.language);
        apiResponse.send(res);
      }
    } catch (e: unknown) {
      for(const interceptor of intercepts){
        await interceptor.afterExecution(req, res, e as Error);
      }
      next(Error);
    } 
  }

  getMiddleware(): Middleware[] {
    return [this.handleRequest.bind(this)];
  }
}