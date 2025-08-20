# Local File System for Avatar Uploads

## Overview

The avatar upload functionality has been updated to use the local file system instead of Dropbox. This change provides better performance and eliminates external dependencies for file storage.

## Changes Made

### 1. New LocalFileManager Class

A new `LocalFileManager` class has been created in `src/core/fileManager/LocalFileManager.ts` that extends the abstract `FileManager` class. This implementation:

- Stores files locally in an `uploads/` directory
- Creates directory structures automatically
- Generates accessible URLs for uploaded files
- Handles file deletion from local storage

### 2. Container Configuration Update

The dependency injection container has been updated in `src/core/container/registerAllDependencies.ts` to use `LocalFileManager` instead of `DropboxFileManager`:

```typescript
// Before
container.bind("FileManager").to(DropboxFileManager).inSingletonScope();

// After  
container.bind("FileManager").to(LocalFileManager).inSingletonScope();
```

### 3. Static File Serving

Static file serving has been added to the main Express application in `src/apps/main/app.ts`:

```typescript
// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
```

### 4. Directory Creation

The uploads directory is automatically created during application startup in `src/apps/main/server.ts`:

```typescript
// Ensure uploads directory exists
try {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  await fs.mkdir(uploadsDir, { recursive: true });
  Logger.info('Uploads directory created/verified ✅');
} catch (error) {
  Logger.error('Failed to create uploads directory:', error);
}
```

## How It Works

### File Upload Process

1. **File Reception**: The `UploadAvatarController` receives the avatar file from the request
2. **File Processing**: The file is formatted and passed to the `UploadAvatarUseCase`
3. **Local Storage**: The `LocalFileManager` stores the file in the local filesystem:
   - Creates the directory structure: `uploads/{userType}/avatars/{userId}/`
   - Generates a unique filename using UUID
   - Writes the file buffer to disk
4. **URL Generation**: Returns a relative URL like `/uploads/students/avatars/user123/uuid.jpg`
5. **Database Update**: The user's avatar information is updated in the database

### File Access

Uploaded avatars are accessible via HTTP requests to:
```
GET /uploads/{userType}/avatars/{userId}/{filename}
```

### File Deletion

When a user uploads a new avatar, the old avatar file is automatically deleted from the local filesystem before the new one is stored.

## File Structure

```
uploads/
├── students/
│   └── avatars/
│       └── user123/
│           └── uuid.jpg
├── coaches/
│   └── avatars/
│       └── coach456/
│           └── uuid.png
└── masters/
    └── avatars/
        └── master789/
            └── uuid.gif
```

## Benefits

1. **Performance**: Faster file access without external API calls
2. **Reliability**: No dependency on external services
3. **Cost**: No external storage costs
4. **Simplicity**: Easier debugging and file management
5. **Offline**: Works without internet connectivity

## Considerations

1. **Storage**: Files are stored on the local filesystem, so ensure adequate disk space
2. **Backup**: Consider implementing backup strategies for the uploads directory
3. **Scaling**: For production deployments, consider using a CDN or load balancer for static file serving
4. **Security**: Ensure proper file permissions and access controls on the uploads directory

## Testing

Tests have been created for the `LocalFileManager` in `src/core/fileManager/LocalFileManager.test.ts` to ensure:

- Files are correctly written to the local filesystem
- Directory structures are created as expected
- File deletion works properly
- Error handling works correctly

## Migration

The change is transparent to existing code. The `UploadAvatarUseCase` and `UploadAvatarController` continue to work exactly as before, but now use local storage instead of Dropbox.

## Future Enhancements

Consider implementing:
- File compression for images
- Automatic cleanup of orphaned files
- File type validation and sanitization
- CDN integration for production environments
