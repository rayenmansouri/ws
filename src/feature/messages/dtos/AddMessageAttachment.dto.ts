import { ID } from "./../../../types/BaseEntity";

export type AddMessageAttachmentDTO = {
  conversation: ID;
  message: ID;
  public_id: string;
  url: string;
  sizeInByte: number;
  mimetype: string;
  name: string;
  uploadedAt: Date;
  type: "file" | "media";
};
