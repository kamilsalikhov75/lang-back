export const titles = {
  errorRegister: "Ошибка при регистрации",
  errorLogin: "Ошибка при авторизации",
  errorUserUpdate:"Ошибка при обновлении данных",
  errorCategoryCreate: "Ошибка при создании категории",
  errorCategoriesGet: "Ошибка при получении категорий",
  errorCategoryDelete: "Ошибка при удалении категории",
  categoryDelete: "Удаление категории",
  wordDelete: "Удаление слова",
  wordDelete: "Обновление слова",
  errorWordCreate: "Ошибка при создании слова",
  errorWordsGet: "Ошибка при получении слов",
  errorWordDelete: "Ошибка при удалении слова",
  errorWordUpdate: "Ошибка при обновлении слова",
};

export const authErrors = {
  emailRepeat: {
    title: titles.errorRegister,
    message: "Такая электронная почта уже используется!",
  },
  wrongLoginData: {
    title: titles.errorLogin,
    message: "Неверные почта или пароль",
  },
  noAccess: {
    title: titles.errorLogin,
    message: "Нет доступа",
  },
  userNotFound: {
    title: titles.errorLogin,
    message: "Пользователь не найден",
  },
};

export const categoryErrors = {
  categoryRepeate: {
    title: titles.errorCategoryCreate,
    message: "Такая категория уже существует",
  },
  categoryNotFound: {
    title: titles.errorCategoryDelete,
    message: "Такой категории нет",
  },
};

export const unkhownError = "Неизвестная ошибка";

export const categoryMessages = {
  successDelete: {
    title: titles.categoryDelete,
    message: "Категория успешно удалена",
  },
};

export const wordMessages = {
  successDelete: {
    title: titles.wordDelete,
    message: "Слово успешно удалено",
  },
  successUpdate: {
    title: titles.wordUpdate,
    message: "Слово успешно обновлено",
  },
};

export const wordErrors = {
  wordDeleteNotFound: {
    title: titles.errorWordDelete,
    message: "Такого слова нет",
  },
  wordUpdateNotFound: {
    title: titles.errorWordUpdate,
    message: "Такого слова нет",
  },
};
