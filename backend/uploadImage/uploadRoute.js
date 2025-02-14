import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadImage } from "./uploadController.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeAdmin,
  upload.single("image"),
  uploadImage
);

export default router;
