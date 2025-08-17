export const createOrganizationRoute = {
  path: "/organizations",
  method: "post" as const,
  isPublic: false,
  platform: "web" as const,
  endUser: "ADMIN" as const,
  description: "Create new organization endpoint",
  requestType: "CreateOrganizationRouteConfig",
  responseType: "CreateOrganizationResponse"
};