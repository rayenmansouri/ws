export const createUserRoute = {
  path: "/users",
  method: "post" as const,
  isPublic: false,
  platform: "web" as const,
  endUser: "ADMIN" as const,
  description: "Create new user endpoint",
  requestType: "CreateUserRouteConfig",
  responseType: "CreateUserResponse"
};