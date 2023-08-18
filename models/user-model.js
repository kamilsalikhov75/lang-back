import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  savedWords:{
    type:[mongoose.Schema.Types.ObjectId],
    ref: "Word",
  }
});

export const UserModel = mongoose.model("User", UserSchema);
