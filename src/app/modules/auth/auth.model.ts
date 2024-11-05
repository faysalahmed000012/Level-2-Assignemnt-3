import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import config from "../../config";
import IUser from "./auth.interface";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: 0,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  address: {
    type: String,
    required: true,
  },
});

// hashing password with bcrypt
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// setting '' after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = mongoose.model<IUser>("users", userSchema);
