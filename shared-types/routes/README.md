# Shared Route Types

This directory contains shared type definitions for all API routes in the `api-v2/` directory. Each route has its own directory with an `index.ts` file that exports:

1. **Route Configuration**: Basic route info (path, method, paramsKey)
2. **Route Type**: Combined type that includes both the route config and response type

## Route Structure

### Authentication Routes (`/auth`)
- **`/me`** - GET - Get current user information
- **`/password`** - PATCH - Update current user password
- **`/forget-password`** - POST - Request password reset
- **`/reset-password`** - POST - Reset password with token
- **`/login`** - POST - User login

### Dashboard Routes (`/dashboard`)
- **`/dashboard`** - GET - Get admin dashboard data

### User Management Routes (`/user-management`)
- **`/users`** - POST - Create new user
- **`/avatar`** - PATCH - Upload user avatar

### Organization API Routes (`/organization-api`)
- **`/organizations`** - POST - Create new organization
- **`/organizations/:organizationId/config`** - GET - Get organization configuration

### Level Management Routes (`/level/web/admin`)
- **`/levels`** - GET - List all levels
- **`/levels/overview`** - GET - Get levels overview with statistics

## Usage

```typescript
import { 
  loginRoute, 
  LoginRouteType,
  dashboardRoute,
  DashboardRouteType 
} from './routes';

// Use route configuration
const loginPath = loginRoute.path; // "/login"
const loginMethod = loginRoute.method; // "post"

// Use route types for type safety
function handleLoginResponse(response: LoginRouteType['response']) {
  // response is typed as LoginResponse
}
```

## Adding New Routes

To add a new route:

1. Create a new directory under the appropriate category
2. Create an `index.ts` file with:
   - Route configuration object
   - Route type that combines config and response
3. Export from the main `index.ts` file
4. Import the types from the corresponding `api-v2` route file

## Pattern

Each route follows this pattern:

```typescript
import { RouteResponse } from "../../../src/api-v2/.../route.types";
import { RouteConfig } from "../../../src/api-v2/.../route.types";

export const routeName = {
    path: "/path",
    method: "http-method",
    paramsKey: ["param1", "param2"], // if path has parameters
};

export type RouteNameType = RouteConfig & {
  response: RouteResponse
}
```
