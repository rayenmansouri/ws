export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export type FilesInRequest<UploadFields extends string> =
  | {
      [Field in UploadFields]?: File[];
    }
  | undefined;