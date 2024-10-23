// routes/indexRoute.ts
import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  login,
  updateUser,
} from "../controllers";

const router = express.Router();

//auth
router.use("/auth/login", login);

//users
router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
