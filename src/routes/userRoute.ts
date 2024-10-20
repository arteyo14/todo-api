import { Router } from "express";
import { deleteUser, getUserById, getUsers } from "../controllers/";

const router = Router();

router.get("/user", getUsers);
router.get("/user/:id", getUserById);
// router.post("/user");
// router.put("/user/:id");
router.delete("/user/:id", deleteUser);

export default router;
