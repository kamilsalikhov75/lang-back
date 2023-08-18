import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { getUser, login, register, updateUserSavedWords } from "./controllers/user-controller.js";
import { checkToken } from "./utils/check-token.js";
import { checkAdmin } from "./utils/check-admin.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "./controllers/category-controller.js";
import { createWord, deleteWord, getWords, getWordsByCategory, updateWord } from "./controllers/word-controller.js";

const port = process.env.PORT || 4000;
const dbUri = process.env.DB_URI || "mongodb://localhost:27017/lang";

mongoose
  .connect(dbUri)
  .then(() => console.log("DB OK"))
  .catch((error) => console.error("DB Error ", error));

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});

app.post("/user/register", register);
app.post("/user/login", login);
app.get("/user/me", checkToken, getUser);
app.patch('/user/saved-words', checkToken, updateUserSavedWords)

app.post("/category", checkToken, checkAdmin, createCategory);
app.delete("/category/:id", checkToken, checkAdmin, deleteCategory);
app.get("/category", getCategories);

app.post("/word", checkToken, checkAdmin, createWord);
app.delete("/word/:id", checkToken, checkAdmin, deleteWord);
app.get("/word", checkToken, getWords);
app.get("/word-by-category/:categoryId", checkToken, getWordsByCategory);
app.patch("/word/:id", checkToken,checkAdmin, updateWord);
