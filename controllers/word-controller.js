import { titles, unkhownError, wordErrors, wordMessages } from "../messages.js";
import { CategoryModel } from "../models/category-model.js";
import { WordModel } from "../models/word-model.js";

export async function createWord(req, res) {
  try {
    const wordDoc = WordModel(req.body);

    const word = await wordDoc.save();

    res.status(200).json(word);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: titles.errorWordCreate,
      message: unkhownError,
    });
  }
}

export async function getWords(req, res) {
  try {
    const words = await WordModel.find();

    res.status(200).json(words);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: titles.errorWordsGet,
      message: unkhownError,
    });
  }
}

export async function getWordsByCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const category = await CategoryModel.findById(categoryId);

    if (!category) {
      return res.status(400).json({
        title: titles.errorWordsGet,
        message: "Такой категории нет",
      });
    }

    const words = await WordModel.find({ category: categoryId });

    res.status(200).json(words);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: titles.errorWordsGet,
      message: unkhownError,
    });
  }
}

export async function deleteWord(req, res) {
  try {
    const { id } = req.params;

    const word = await WordModel.findByIdAndDelete(id);

    if (!word) {
      return res.status(400).json(wordErrors.wordDeleteNotFound);
    }

    res.status(200).json(wordMessages.successDelete);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: titles.errorWordDelete,
      message: unkhownError,
    });
  }
}

export async function updateWord(req, res) {
  try {
    const word = await WordModel.findByIdAndUpdate(req.params.id, req.body);

    if (!word) {
      return res.status(400).json(wordErrors.wordUpdateNotFound);
    }

    res.status(200).json(word);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: titles.errorWordUpdate,
      message: unkhownError,
    });
  }
}
