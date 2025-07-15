export abstract class ExportTableManager {
  public abstract export(data: object[]): Promise<Buffer>;

  public abstract getContentType(): string;

  public abstract getFileExtension(): string;
}
