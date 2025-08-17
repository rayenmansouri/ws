# IECD Shared Types

This package contains shared TypeScript types for IECD API routes and entities.

## Structure

- `enums/` - Enums used across the application
- `entities/` - Entity type definitions  
- `routes/` - API route request/response types
- `common/` - Common utility types
- `route-metadata/` - Route metadata objects

## Usage

```typescript
import { UserTypeEnum, OrganizationSystemType } from '@iecd/shared-types/enums';
import { BaseUser, Organization } from '@iecd/shared-types/entities';
import { LoginRouteConfig, CreateUserResponse } from '@iecd/shared-types/routes';
import { TypedRequestOptions, PaginationMeta } from '@iecd/shared-types/common';
import { loginRoute, createUserRoute } from '@iecd/shared-types/route-metadata';
```

## Building

```bash
npm run build    # Build the package
npm run dev      # Build in watch mode
npm run clean    # Clean build files
```

## Available Types

### Enums
- `UserTypeEnum` - ADMIN, MASTER, COACH, PARTICIPANT
- `OrganizationSystemType` - DNC, CAR, SESAME, CERES, LIBAN
- `GradeBookTheme` - YELLOW, BLUE

### Entities
- `BaseUser` - Base user entity type
- `Organization` - Organization entity type
- `FileDTO` - File upload/download type

### Routes
- `LoginRouteConfig`, `LoginResponse` - Login endpoint types
- `CreateUserRouteConfig`, `CreateUserResponse` - Create user endpoint types
- `CreateOrganizationRouteConfig`, `CreateOrganizationResponse` - Create organization endpoint types
- `GetConfigRouteType`, `GetConfigResponse` - Get config endpoint types