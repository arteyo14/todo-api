import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { verifyPassword } from "../../utils";
import jwt from "jsonwebtoken";

const secretKey = "@rteyo_90090"; // เปลี่ยนเป็นคีย์ลับที่ปลอดภัย
const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const validate: { [key: string]: string } = {};

    if (!username || username.trim() === "") {
      validate.username = "โปรดระบุ";
    }

    if (!password || password.trim() === "") {
      validate.password = "โปรดระบุ";
    }

    if (Object.keys(validate).length > 0) {
      res.status(400).json({ status: false, code: 400, error: validate });
      return;
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      res.status(401).json({
        status: false,
        code: 401,
        error: { message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" },
      });
      return;
    }

    const isPasswordValid = await verifyPassword(password, user?.password);
    if (!isPasswordValid) {
      res.status(401).json({
        status: false,
        code: 401,
        error: { message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" },
      });
      return;
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
      },
      secretKey,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
      },
      secretKey,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: true,
      code: 200,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      error:
        error instanceof Error
          ? error.message
          : { message: "พบบางอย่างผิดพลาด" },
    });
  }
};
