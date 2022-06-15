import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

export interface IUser {
  id: string;
  name?: string;
  address: string;
  avatar?: string;
  collections: string[];
  likes: string[];
  following: string[];
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
    },
    likes: [
      {
        type: String,
      },
    ],
    following: [
      {
        type: String,
      },
    ],
    collections: [
      {
        type: Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);
export const User = model<IUser>("User", UserSchema);
