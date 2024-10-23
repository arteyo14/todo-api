import express from "express";
import authRouter from "./auth/authRoute";
import userRouter from "./users/usersRoute";

const router = express.Router();

// ใช้ Router ที่แยกไว้สำหรับ Authentication และ User
router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;
