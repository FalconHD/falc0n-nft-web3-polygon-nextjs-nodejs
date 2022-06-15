import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";

export interface ICollection {
  id: string;
  address: string;
  owner: string;
  followers?: string[];
  nfts?: string[];
}

const CollectionSchema = new Schema<ICollection>(
  {
    address: {
      type: String,
      required: true,
    },
    followers: [
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
    nfts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Nft",
      },
    ],
  },
  { timestamps: true }
);

CollectionSchema.plugin(uniqueValidator);
export const Collection = model<ICollection>("Collection", CollectionSchema);
