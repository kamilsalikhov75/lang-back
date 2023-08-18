import { authErrors } from "../messages.js";
import { UserModel } from "../models/user-model.js";

export async function checkAdmin(req, res, next) {
  const user = await UserModel.findById(req.userId);

  if (user.role !== "admin") {
    return res.status(400).json(authErrors.noAccess);
  }

  next();
}
