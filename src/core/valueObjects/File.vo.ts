export const SUPPORTED_FILES_MIMETYPE_ENUM = {
  PDF: "PDF",
  DOC: "DOC",
  DOCX: "DOCX",
  XLS: "XLS",
  XLSX: "XLSX",
  PPT: "PPT",
  PPTX: "PPTX",
  TXT: "TXT",
  CSV: "CSV",
} as const;

export type TSupportedFilesMimetypeTypeEnums =
  (typeof SUPPORTED_FILES_MIMETYPE_ENUM)[keyof typeof SUPPORTED_FILES_MIMETYPE_ENUM];

export const SUPPORTED_MULTIMEDIA_MIMETYPE_ENUM = {
  JPEG: "JPEG",
  PNG: "PNG",
  GIF: "GIF",
  MP4: "MP4",
  WEBM: "WEBM",
} as const;

export type TSupportedMultimediaMimetypeTypeEnums =
  (typeof SUPPORTED_MULTIMEDIA_MIMETYPE_ENUM)[keyof typeof SUPPORTED_MULTIMEDIA_MIMETYPE_ENUM];

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
