import express from "express";

//controllers
import {
  listMovies,
  createMovie,
  findMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
} from "./moviecontroller.js";

//middlewares
import { authenticate, authorizeAdmin } from "../middleware/auth.js";
import checkId from "../middleware/checkId.js";

const router = express.Router();

//Public routes
router.get("/all-movies", listMovies);
router.get("/movie/:id", findMovie);
router.get("/new-movies", getNewMovies);
router.get("/top-movies", getTopMovies);
router.get("/random-movies", getRandomMovies);

//Restricted routes
router.post("/:id/reviews", authenticate, checkId, movieReview);

//Admin routes
router.post("/create-movie", authenticate, authorizeAdmin, createMovie);
router.put("/update/:id", authenticate, authorizeAdmin, updateMovie);
router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie);
router.delete("/delete-comment", authenticate, authorizeAdmin, deleteComment);

export default router;
