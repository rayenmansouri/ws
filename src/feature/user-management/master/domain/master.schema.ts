import { Schema } from "mongoose";

export const MasterSchema =  new Schema({
    isMaster: { type: Boolean, default: true },
});

