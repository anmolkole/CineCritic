import { useState } from "react";
import {
  useNewMoviesQuery,
  useTopMoviesQuery,
  useRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../components/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useNewMoviesQuery();
  const { data: topMovies } = useTopMoviesQuery();
  const { data: randomMovies } = useRandomMoviesQuery();
  const { data: genres } = useFetchGenresQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = (data ?? []).filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  // Ensure randomMovies is an array
  const randomMoviesList = Array.isArray(randomMovies) ? randomMovies : [];

  // Only access .length when filteredMovies is defined
  const minMoviesNeeded = 4;
  const hasEnoughMovies = filteredMovies?.length >= minMoviesNeeded;

  // If not enough movies, fill with random movies
  const finalMovies = hasEnoughMovies
    ? filteredMovies
    : [
        ...filteredMovies,
        ...randomMoviesList.slice(
          0,
          minMoviesNeeded - (filteredMovies?.length || 0)
        ),
      ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Genre Filter */}
      <nav className="flex flex-wrap gap-3 justify-center mb-8">
        {genres?.map((genre) => (
          <button
            key={genre._id}
            onClick={() => handleGenreClick(genre._id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
              ${
                selectedGenre === genre._id
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {genre.name}
          </button>
        ))}
      </nav>

      {/* Filtered Movies */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Search with Genre
        </h2>
        <SliderUtil data={finalMovies} />
      </section>

      {/* Top Movies */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Movies</h2>
        <SliderUtil data={topMovies} />
      </section>

      {/* Random Movies */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Choose Form Random Movies
        </h2>
        <SliderUtil data={randomMovies} />
      </section>

      <div className="h-20"></div>
    </div>
  );
};

export default MoviesContainerPage;
