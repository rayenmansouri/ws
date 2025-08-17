export const loginRoute = {
  path: "/login",
  method: "post" as const,
  isPublic: true,
  platform: "web" as const,
  description: "User login endpoint",
  requestType: "LoginRouteConfig",
  responseType: "LoginResponse"
};