import { ObjectId, Types } from "mongoose";
import { TEndUserWithoutMasterEnums } from "../../../constants/globalEnums";
import { createSchema } from "../../../helpers/createSchema";
import { IEntity } from "../../../types/entities";

export interface IFeed extends IEntity {
  user: ObjectId;
  userType: TEndUserWithoutMasterEnums;
  posts: ObjectId[];
  unseenPosts: ObjectId[];
}

export const feedSchema = createSchema<IFeed>({
  user: { type: Types.ObjectId, refPath: "userType" },
  userType: { type: String },
  posts: [{ type: Types.ObjectId, ref: "post" }],
  unseenPosts: [{ type: Types.ObjectId, ref: "post" }],
});
