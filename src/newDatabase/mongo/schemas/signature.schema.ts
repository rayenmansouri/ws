import { Types } from "mongoose";
import { fileSchema } from "../../../database/schema/announcement/comment.schema";
import { Signature } from "../../../feature/signatures/domain/signature.entity";
import { createMongoSchema } from "../createSchema";

export const mongoSignatureSchema = createMongoSchema<Signature>({
  name: String,
  image: fileSchema,
  classTypes: [{ type: Types.ObjectId, ref: "classType" }],
  personName: String,
});
