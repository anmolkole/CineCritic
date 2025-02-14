import express from "express";
import {
  createUser,
  loginUser,
  logOutUser,
  getAllUsers,
  getUserProfile,
  updateUser,
} from "./userController.js";

//middlewares
import { authenticate, authorizeAdmin } from "../middleware/auth.js";
//controllers

const router = express.Router();

router.post("/", createUser);
router.get("/", authenticate, authorizeAdmin, getAllUsers);
router.get("/profile", authenticate, getUserProfile);
router.put("/profile", authenticate, updateUser);
router.post("/auth", loginUser);
router.post("/logout", logOutUser);

export default router;
