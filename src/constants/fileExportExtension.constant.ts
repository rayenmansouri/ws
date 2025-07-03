export const FILE_EXPORT_EXTENSION_ENUM = {
  CSV: "csv",
  XLSX: "xlsx",
} as const;
export type TFileExportExtensionEnum =
  (typeof FILE_EXPORT_EXTENSION_ENUM)[keyof typeof FILE_EXPORT_EXTENSION_ENUM];
