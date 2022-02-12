import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { typeCryptographyJwt } from "../configurations/config";
export const auth = (
  { headers: { token } }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.locals.user = jwt.verify(token as string, typeCryptographyJwt);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
