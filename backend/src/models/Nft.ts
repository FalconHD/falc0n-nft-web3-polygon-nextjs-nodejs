import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

export interface INft {
  id: string;
  address: string;
  owner: string;
  likes?: string[];
}

const NftSchema = new Schema<INft>(
  {
    address: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

NftSchema.plugin(uniqueValidator);
export const Nft = model<INft>("Nft", NftSchema);
