import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
  title: {
    type: String,
    requires: true,
    unique: true,
  },
});

export const CategoryModel = mongoose.model("Category", CategorySchema);
