import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = "@rteyo_90090";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      status: false,
      code: 401,
      error: { message: "Access token is missing or invalid" },
    });
    return;
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(403).json({
        status: false,
        code: 403,
        error: { message: "Invalid token" },
      });
      return;
    }

    (req as any).user = decoded;
    next(); // เรียก next() เมื่อโทเค็นถูกต้อง
  });
};
