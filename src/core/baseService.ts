import { ClientSession, Connection } from "mongoose";
import { TEndUserEnum } from "../constants/globalEnums";
import { IUser } from "../types/entities";
import { RouteContext, RouteContextOptions } from "./Routes/createRoutes";
import { ID } from "../types/BaseEntity";

export class BaseService<T extends RouteContextOptions, withTransaction extends boolean = false> {
  connection: Connection;
  session: withTransaction extends true ? ClientSession : null;
  tenantId: ID;
  user: IUser;
  files: T["files"];
  body: T["body"];
  params: T["params"];
  query: T["query"];
  endUser?: TEndUserEnum;

  constructor(routeContext: RouteContext<T, withTransaction>) {
    this.connection = routeContext.connection;
    this.session = routeContext.session;
    this.tenantId = routeContext.tenantId;
    this.user = routeContext.user;
    this.files = routeContext.files;
    this.body = routeContext.body;
    this.params = routeContext.params;
    this.query = routeContext.query;
    this.endUser = routeContext.endUser;
  }
}
