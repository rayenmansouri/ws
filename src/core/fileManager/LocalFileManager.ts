import { injectable } from "inversify";
import fs from "fs/promises";
import path from "path";
import { FileManager, FileUploadPayload, FileDetails } from "./FileManager";

@injectable()
export class LocalFileManager extends FileManager {
  private readonly uploadBasePath = "uploads";

  
  protected async baseUploadFile(
    filePayload: FileUploadPayload,
    filePath: string,
  ): Promise<string> {
    // Create the full directory path
    const fullDirPath = path.join(process.cwd(), this.uploadBasePath, filePath);
    
    // Ensure the directory exists
    await fs.mkdir(fullDirPath, { recursive: true });
    
    // Create the full file path
    const fullFilePath = path.join(fullDirPath, path.basename(filePath));
    
    // Write the file to the local filesystem
    await fs.writeFile(fullFilePath, filePayload.buffer);
    
    // Return a relative URL that can be used to access the file
    // This will be relative to the uploads directory
    const relativePath = path.relative(process.cwd(), fullFilePath);
    return `/${relativePath.replace(/\\/g, '/')}`;
  }

  protected async baseBatchUploadFiles(
    filePayloads: FileUploadPayload[],
    paths: string[],
  ): Promise<FileDetails[]> {
    const results = [];
    
    for (let i = 0; i < filePayloads.length; i++) {
      const filePayload = filePayloads[i];
      const filePath = paths[i];
      
      const link = await this.baseUploadFile(filePayload, filePath);
      
      results.push({
        name: filePayload.name,
        link,
        path: filePath,
        uploadedAt: new Date(),
        size: filePayload.buffer.byteLength,
        mimeType: path.extname(filePayload.name).replace(".", ""),
      });
    }
    
    return results;
  }

  protected async baseDeleteFiles(filePaths: string[]): Promise<void> {
    for (const filePath of filePaths) {
      try {
        // Convert the relative URL path to a local file path
        const localPath = path.join(process.cwd(), filePath.replace(/^\//, ''));
        await fs.unlink(localPath);
      } catch (error) {
        // If file doesn't exist, that's fine - just continue
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
          throw error;
        }
      }
    }
  }
}
