import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../../controllers";
import { authenticateToken } from "../../middlewares";

const usersRouter = Router();

usersRouter.get("/", authenticateToken, getUsers);
usersRouter.get("/:id", authenticateToken, getUserById);
usersRouter.post("/", createUser);
usersRouter.put("/:id", authenticateToken, updateUser);
usersRouter.delete("/:id", authenticateToken, deleteUser);

export default usersRouter;
