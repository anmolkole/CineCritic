import Genre from "./genreModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createGenre = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Genre name is Required" });
  }

  const existingGenre = await Genre.findOne({ name });

  if (existingGenre) {
    return res.status(400).json({ error: "Genre already exists" });
  }

  const genre = new Genre({ name });
  await genre.save();

  res.status(200).json(genre);
});

const updateGenre = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name) {
    return res.status(400).json({ error: "Genre name is required" });
  }

  const genre = await Genre.findById(id);

  if (!genre) {
    return res.status(404).json({ error: "Genre not found" });
  }

  const existingGenre = await Genre.findOne({ name });

  if (existingGenre) {
    return res.status(400).json({ error: "Genre already exists" });
  }

  genre.name = name;

  const updatedGenre = await genre.save();
  res.status(200).json(updatedGenre);
});

const deleteGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const genre = await Genre.findById(id);

  if (!genre) {
    return res.status(404).json({ error: "Genre not found" });
  }

  await genre.deleteOne();

  res.status(200).json({ message: "Genre Deleted Successfully" });
});

const listGenre = asyncHandler(async (req, res) => {
  const genres = await Genre.find();

  if (!genres) {
    return res.status(404).json({ error: "Genres not found" });
  }

  res.status(200).json(genres);
});

const readGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const genre = await Genre.findById(id);

  if (!genre) {
    return res.status(404).json({ error: "Genre Not Found" });
  }

  res.status(200).json(genre);
});

export { createGenre, updateGenre, deleteGenre, listGenre, readGenre };
