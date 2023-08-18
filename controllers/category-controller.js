import { categoryErrors, titles, unkhownError } from "../messages.js";
import { CategoryModel } from "../models/category-model.js";

export async function createCategory(req, res) {
  try {
    const { title } = req.body;

    const checkCategory = await CategoryModel.findOne({ title });
    if (checkCategory) {
      return res.status(400).json(categoryErrors.categoryRepeate);
    }

    const categoryDoc = CategoryModel({ title });

    const category = await categoryDoc.save();

    res.status(200).json({ category });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: titles.errorCategoryCreate,
      message: unkhownError,
    });
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await CategoryModel.find();

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: titles.errorCategoriesGet,
      message: unkhownError,
    });
  }
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findByIdAndDelete(id);

    if (!category) {
      return res.status(400).json(categoryErrors.categoryNotFound);
    }

    res.status(200).json({
      title: "Удаление категории",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: titles.errorCategoryDelete,
      message: unkhownError,
    });
  }
}
