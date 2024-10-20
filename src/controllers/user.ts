import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });
    res.status(200).json({
      status: true,
      code: 200,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      error:
        error instanceof Error ? error.message : { message: "Unknown error" },
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const findUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!findUser) {
      res.status(404).json({
        status: false,
        code: 404,
        error: { message: "User not found" },
      });
      return;
    }

    res.status(200).json({
      status: true,
      code: 200,
      data: findUser,
    });
  } catch (error) {
    res.status(500).json({ status: false, code: 500, error });
  }
};

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
        error: { message: "User not found" },
      });
      return;
    }

    res.status(200).json({
      status: true,
      code: 200,
      message: { message: "User deleted successfully" },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ status: false, code: 500, error: { message: error.meta.cause } });
  }
};
