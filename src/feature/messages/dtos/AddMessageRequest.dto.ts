import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ID } from "./../../../types/BaseEntity";
import { FileRequestDTO } from "../../../core/valueObjects/File.vo";

export type AddMessageRequestDTO = {
  content?: string;
  replyTo?: string;
  files: FileRequestDTO[];
  media: FileRequestDTO[];
  links: string[];
  userId: ID;
  userNewId: string;
  userType: TEndUserEnum;
  tenantId: string;
  fullName: string;
  avatar: string;
  email: string | null;
  phoneNumber: string | null;
  participants: { _id: ID; userType: TEndUserEnum }[];
  conversationNewId?: string;
};
