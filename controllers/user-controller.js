import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user-model.js";
import { authErrors, titles, unkhownError } from "../messages.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const checkEmail = await UserModel.findOne({ email });
    if (checkEmail) {
      return res.status(400).json(authErrors.emailRepeat);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const userDoc = UserModel({
      name: name,
      email: email,
      passwordHash: hash,
    });

    const user = await userDoc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "lang-token-code",
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: titles.errorRegister,
      message: unkhownError,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json(authErrors.wrongLoginData);
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(400).json(authErrors.wrongLoginData);
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "lang-token-code",
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: titles.errorLogin,
      message: unkhownError,
    });
  }
}

export async function getUser(req, res) {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(400).json(authErrors.userNotFound);
    }

    const { passwordHash, ...userData } = user._doc;
    const { __v, ...data } = userData;

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: titles.errorLogin,
      message: unkhownError,
    });
  }
}

export async function updateUserSavedWords(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.userId, {
      savedWords: req.body,
    });

    if (!user) {
      return res.status(400).json(authErrors.userNotFound);
    }

    const { passwordHash, ...userData } = user._doc;
    const { __v, ...data } = userData;

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      title: titles.errorUserUpdate,
      message: unkhownError,
    });
  }
}
