import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    if (!deleteUser) {
      res.status(404).json({
        status: false,
        code: 404,
        error: { message: "ไม่พบผู้ใช้งาน" },
      });
      return;
    }

    res.status(200).json({
      status: true,
      code: 200,
      data: {},
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ status: false, code: 500, error: { message: error.meta.cause } });
  }
};
