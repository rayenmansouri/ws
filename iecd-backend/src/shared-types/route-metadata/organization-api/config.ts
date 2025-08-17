export const getConfigRoute = {
  path: "/organizations/:organizationId/config",
  method: "get" as const,
  isPublic: true,
  platform: "web" as const,
  description: "Get organization configuration endpoint",
  requestType: "GetConfigRouteType",
  responseType: "GetConfigResponse"
};