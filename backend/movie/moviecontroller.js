import cloudinary from "cloudinary";
import Movie from "./movieModel.js";

const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMovieWithImage = async (req, res) => {
  try {
    const { name, genre, year, detail, cast, imageUrl, publicId } = req.body;
    // const imageUrl = req.body.imageUrl; ///cloudinary image url
    // const publicId = req.body.publicId;

    if (!imageUrl || !publicId) {
      return res.status(400).json({ message: "Image must be uploaded first" });
    }

    // Validate required fields
    if (!name || !year || !genre || !detail || !cast) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingMovie = await Movie.findOne({ name });
    if (existingMovie) {
      return res.status(400).json({ message: "Movie already exists" });
    }

    const newMovie = new Movie({
      name,
      genre,
      year,
      detail,
      image: imageUrl,
      publicId,
    });

    await newMovie.save();
    res
      .status(201)
      .json({ message: "Movie created successfully", movie: newMovie });
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const listMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    if (!movies) {
      res.status(404).json("Movies not found");
    }
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findMovie = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json("Id not Found");
  }
  try {
    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year, detail, cast, genre, image, publicId } = req.body;

    //console.log("Received data in backend:", req.body);

    const movie = await Movie.findById(id);

    console.log(movie);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // If a new image is uploaded, delete the old image from Cloudinary

    // console.log("imageUrl:", image);
    // console.log("publicId:", publicId);
    // console.log("movie.publicId:", movie.publicId);

    if (image && publicId && movie.publicId !== publicId) {
      //console.log("Deleting old image:", movie.publicId);
      await cloudinary.v2.uploader.destroy(movie.publicId);
      //console.log("old image deleted sucessfully");
    }

    // Update movie details
    movie.name = name;
    movie.year = year;
    movie.detail = detail;
    movie.cast = cast;
    movie.genre = genre;
    if (image && publicId) {
      movie.image = image; // Correct field name
      movie.publicId = publicId;
      //console.log("Updated image details:", { image, publicId });
    }

    await movie.save();
    res.status(200).json({ message: "Movie updated successfully", movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update movie" });
  }
};

const movieReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Review already posted");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();
      res.status(201).json({ message: "Review Added" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movieToDelete = await Movie.findByIdAndDelete(id);
    if (!movieToDelete) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({
      message: "Following movie has been deleted",
      movie: movieToDelete.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { movieId, reviewId } = req.body; // ✅ Ensure using req.body

    if (!movieId || !reviewId) {
      return res
        .status(400)
        .json({ message: "Movie ID and Review ID are required" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId.toString()
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the review
    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movie.reviews.length
        : 0;

    await movie.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getNewMovies = async (req, res) => {
  try {
    const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(newMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTopMovies = async (req, res) => {
  try {
    const topRatedMovies = await Movie.find()
      .sort({ numReviews: -1 })
      .limit(10);
    res.status(200).json(topRatedMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRandomMovies = async (req, res) => {
  try {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    res.status(200).json(randomMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
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
  createMovieWithImage,
};
