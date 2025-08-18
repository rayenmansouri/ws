// Auth routes
export * from './auth/me';
export * from './auth/me/updateCurrentUserPassword';
export * from './auth/public/forget-password';
export * from './auth/public/reset-password';
export * from './login';

// Dashboard routes
export * from './dashboard';

// User management routes
export * from './user-management/createUser';
export * from './user-management/uploadAvatar';

// Organization API routes
export * from './organization-api/create-organization';
export * from './organization-api/config';

// Level routes
export * from './level/web/admin/listLevels';
export * from './level/web/admin/levelsOverview';