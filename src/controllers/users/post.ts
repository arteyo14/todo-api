import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { hashPassword } from "../../utils";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    const validate: { [key: string]: string } = {};

    // ตรวจสอบการมีอยู่ของ username และ email ในระบบ
    const [existingUser, existingEmail] = await Promise.all([
      prisma.user.findUnique({ where: { username } }),
      prisma.user.findUnique({ where: { email } }),
    ]);

    if (existingUser) {
      validate.username = "ชื่อผู้ใช้งานอยู่ในระบบแล้ว";
    }

    if (existingEmail) {
      validate.email = "อีเมล์นี้มีในระบบแล้ว";
    }

    //check username
    if (!username || username.trim() === "") {
      validate.username = "โปรดระบุ";
    } else if (username.length < 8) {
      validate.username = "ชื่อผู้ใช้งานต้องมีความยาวอย่างน้อย 8 ตัวอักษร";
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      validate.username = "ชื่อผู้ใช้งานต้องมีเฉพาะตัวอักษและตัวเลขเท่านั้น";
    }

    //เช็ครหัสผ่าน
    if (!password || password.trim() === "") {
      validate.password = "โปรดระบุ";
    } else if (password.length < 8) {
      validate.password = "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร";
    } else if (!/^[a-zA-Z0-9_]+$/.test(password)) {
      validate.password = "รหัสผ่านต้องมีเฉพาะตัวอักษและตัวเลขเท่านั้น";
    }

    //เช็ค e-mail
    if (!email || email.trim() === "") {
      validate.email = "โปรดระบุ";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      validate.email = "รูปแบบของอีเมลล์ไม่ถูกต้อง";
    }

    if (Object.keys(validate).length > 0) {
      res.status(400).json({ status: false, code: 400, error: validate });
      return;
    }

    const hash = await hashPassword(password);

    await prisma.user.create({
      data: {
        username,
        password: hash,
        email,
      },
    });

    res.status(201).json({
      status: true,
      code: 201,
      data: {},
    });
  } catch (error) {
    res.status(500).json({ status: false, code: 500, error });
  }
};
