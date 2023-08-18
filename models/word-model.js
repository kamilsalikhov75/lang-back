import mongoose from "mongoose";

const LangSchema = mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  transcription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const WordSchema = mongoose.Schema({
  ru: LangSchema,
  en: LangSchema,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const WordModel = mongoose.model("Word", WordSchema);
