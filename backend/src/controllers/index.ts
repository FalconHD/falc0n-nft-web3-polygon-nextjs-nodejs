import { User } from "@models";
import { Types } from "mongoose";

export const handleUserState = async (address: string, data: any) => {
  const user = await User.findOne({ address });
  if (user) {
    return user;
  }

  const newUser = new User({
    address,
  });
  return newUser.save();
};
