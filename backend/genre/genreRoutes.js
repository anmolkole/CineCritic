import express from "express";
import {
  createGenre,
  updateGenre,
  deleteGenre,
  listGenre,
  readGenre,
} from "./genreController.js";

const router = express.Router();

//controllers

//middlewares
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

router.post("/", authenticate, authorizeAdmin, createGenre);
router.put("/:id", authenticate, authorizeAdmin, updateGenre);
router.delete("/:id", authenticate, authorizeAdmin, deleteGenre);
router.get("/list", listGenre);
router.get("/:id", readGenre);

export default router;
