import mongosse from "mongoose";

const { DATABASE_URL } = process.env;

export const connection = (cb: Function) =>
  mongosse
    .connect(DATABASE_URL)
    .then(() => {
      console.log("DB connected");
      cb();
    })
    .catch((err) => {
      console.log(err.message);
      cb();
    });
