import { Types } from "mongoose";
import { createMongoSchema } from "../createSchema";
import { Conversation } from "./../../../feature/messages/domain/conversation.entity";

export const mongoConversationSchema = createMongoSchema<Conversation>({
  name: String,
  isGroup: Boolean,
  participants: [
    {
      joinedAt: Date,
      user: {
        type: Types.ObjectId,
        refPath: "participants.userType",
        index: true,
      },
      userType: String,
      role: String,
    },
  ],
  seenStatus: {
    //@ts-ignore
    type: Map,
    of: {
      userType: String,
      seenAt: Date,
      message: Types.ObjectId,
    },
  },
});

mongoConversationSchema.index({ "participants.user": 1 });
