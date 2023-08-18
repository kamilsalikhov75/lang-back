import jwt from "jsonwebtoken";
import { authErrors } from "../messages.js";

export function checkToken(req, res, next) {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (token) {
    try {
      const decoded = jwt.verify(token, "lang-token-code");

      req.userId = decoded._id;
      next();
    } catch (err) {
      return res.status(403).json(authErrors.noAccess);
    }
  } else {
    return res.status(403).json(authErrors.noAccess);
  }
}
