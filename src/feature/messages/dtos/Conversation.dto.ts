import { ID } from "../../../types/BaseEntity";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { UserProfileDTO } from "./../../users/dtos/userProfile.dto";

export type ConversationDTO = {
  _id: ID;
  name: string | null;
  newId: string;
  participants: (UserProfileDTO & { userType: TEndUserEnum })[];
  lastMessage: LastMessageDTO | null;
  isGroup: boolean;
  isSeen: boolean;
};

export type LastMessageDTO = {
  _id: ID;
  newId: string;
  senderId: ID | null;
  senderName: string | null;
  content: string | null;
  sentAt: Date | null;
  files: ID[];
  media: ID[];
  type: "attachment" | "content";
  seenBy: (UserProfileDTO & { userType: TEndUserEnum; seenAt: Date })[];
  isDeleted: boolean;
};

export type toConversationDTOParams = {
  conversation: {
    participants: { user: UserProfileDTO & { userType: TEndUserEnum } }[];
    isGroup: boolean;
    name: string | null;
    _id: ID;
    newId: string;
  };
  lastMessage: LastMessageDTO | null;
  userId: ID;
};
