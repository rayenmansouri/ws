export type FileDTO = {
  path: string;
  name: string;
  mimetype: string;
  sizeInByte: number;
  url: string;
  uploadedAt: Date;
};

export type FileRequestDTO = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};