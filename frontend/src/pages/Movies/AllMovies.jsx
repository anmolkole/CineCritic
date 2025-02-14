import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useListMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useNewMoviesQuery,
  useTopMoviesQuery,
  useRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/movieSlice.js";

const AllMovies = () => {
  const dispatch = useDispatch();

  const { data } = useListMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useNewMoviesQuery();
  const { data: topMovies } = useTopMoviesQuery();
  const { data: randomMovies } = useRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears || []));
    dispatch(setUniqueYears(uniqueYears || []));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredSearchMovies = data?.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredSearchMovies || []));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = data?.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre || []));
  };

  const handleYearChange = (year) => {
    const filterByYear = data?.filter((movie) => movie.year === Number(year));
    dispatch(setFilteredMovies(filterByYear || []));
  };

  const handleSortChange = (sortOption) => {
    let sortedMovies = [];

    switch (sortOption) {
      case "new":
        sortedMovies = newMovies || [];
        break;
      case "top":
        sortedMovies = topMovies || [];
        break;
      case "random":
        sortedMovies = randomMovies || [];
        break;
      default:
        sortedMovies = data || [];
        break;
    }

    dispatch(setMoviesFilter({ selectedSort: sortOption }));
    dispatch(setFilteredMovies(sortedMovies || []));
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center flex flex-col items-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto p-6">
        {/* Heading & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-white">MOVIES FLIX</h1>
            <p className="text-gray-300">
              Cinematic Treat: Made for Movieheads
            </p>
          </div>
          <input
            type="text"
            placeholder="Search Movie..."
            value={moviesFilter.searchTerm}
            onChange={handleSearchChange}
            className="mt-4 md:mt-0 px-4 py-2 w-full md:w-96 bg-white text-gray-900 rounded-lg shadow-md focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <select
            value={moviesFilter.selectedGenre}
            onChange={(e) => handleGenreClick(e.target.value)}
            className="px-4 py-2 bg-white text-gray-800 rounded-lg shadow-md focus:outline-none"
          >
            <option value="">Genres</option>
            {genres?.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>

          <select
            value={moviesFilter.selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="px-4 py-2 bg-white text-gray-800 rounded-lg shadow-md focus:outline-none"
          >
            <option value="">Year</option>
            {uniqueYears?.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={moviesFilter.selectedSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2 bg-white text-gray-800 rounded-lg shadow-md focus:outline-none"
          >
            <option value="">Sort by</option>
            <option value="new">New Movies</option>
            <option value="top">Top Movies</option>
            <option value="random">Random Movies</option>
          </select>
        </div>

        {/* Movies Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies?.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </section>

        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default AllMovies;

// /**
//  import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useListMoviesQuery } from "../../redux/api/movies";
// import { useFetchGenresQuery } from "../../redux/api/genre";
// import {
//   useNewMoviesQuery,
//   useTopMoviesQuery,
//   useRandomMoviesQuery,
// } from "../../redux/api/movies";
// import MovieCard from "./MovieCard";
// import {
//   setMoviesFilter,
//   setFilteredMovies,
//   setMovieYears,
//   setUniqueYears,
// } from "../../redux/features/movies/movieSlice.js";

// const AllMovies = () => {
//   const dispatch = useDispatch();

//   const { data } = useListMoviesQuery();
//   const { data: genres } = useFetchGenresQuery();
//   const { data: newMovies } = useNewMoviesQuery();
//   const { data: topMovies } = useTopMoviesQuery();
//   const { data: randomMovies } = useRandomMoviesQuery();

//   const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

//   const movieYears = data?.map((movie) => movie.year);
//   const uniqueYears = Array.from(new Set(movieYears));

//   useEffect(() => {
//     dispatch(setFilteredMovies(data || []));
//     dispatch(setMovieYears(movieYears || []));
//     dispatch(setUniqueYears(uniqueYears || []));
//   }, [data, dispatch]);

//   const handleSearchChange = (e) => {
//     dispatch(setMoviesFilter({ searchTerm: e.target.value }));

//     const filteredSearchMovies = data?.filter((movie) =>
//       movie.name.toLowerCase().includes(e.target.value.toLowerCase())
//     );

//     dispatch(setFilteredMovies(filteredSearchMovies || []));
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-900 flex flex-col items-center">
//       {/* Title & Search Bar Section with Background Image */}
//       <div className="relative w-full">
//         <img
//           src="/title-bg.jpg" // Replace with your image URL
//           alt="Movies Background"
//           className="w-full h-64 object-cover brightness-50"
//         />
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
//           <h1 className="text-4xl font-bold text-white">MOVIES FLIX</h1>
//           <p className="text-gray-300">Cinematic Treat: Made for Movieheads</p>
//           <input
//             type="text"
//             placeholder="Search Movie..."
//             value={moviesFilter.searchTerm}
//             onChange={handleSearchChange}
//             className="mt-4 px-4 py-2 w-full md:w-96 bg-white text-gray-900 rounded-lg shadow-md focus:outline-none"
//           />
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="relative z-10 w-full max-w-6xl mx-auto p-6">
//         <div className="flex flex-wrap justify-center gap-4 mb-8">
//           <select
//             value={moviesFilter.selectedGenre}
//             onChange={(e) => dispatch(setFilteredMovies(data?.filter(movie => movie.genre === e.target.value) || []))}
//             className="px-4 py-2 bg-white text-gray-800 rounded-lg shadow-md focus:outline-none"
//           >
//             <option value="">Genres</option>
//             {genres?.map((genre) => (
//               <option key={genre._id} value={genre._id}>
//                 {genre.name}
//               </option>
//             ))}
//           </select>

//           <select
//             value={moviesFilter.selectedYear}
//             onChange={(e) => dispatch(setFilteredMovies(data?.filter(movie => movie.year === Number(e.target.value)) || []))}
//             className="px-4 py-2 bg-white text-gray-800 rounded-lg shadow-md focus:outline-none"
//           >
//             <option value="">Year</option>
//             {uniqueYears?.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>

//           <select
//             value={moviesFilter.selectedSort}
//             onChange={(e) => {
//               let sortedMovies = [];
//               switch (e.target.value) {
//                 case "new":
//                   sortedMovies = newMovies || [];
//                   break;
//                 case "top":
//                   sortedMovies = topMovies || [];
//                   break;
//                 case "random":
//                   sortedMovies = randomMovies || [];
//                   break;
//                 default:
//                   sortedMovies = data || [];
//                   break;
//               }
//               dispatch(setFilteredMovies(sortedMovies));
//             }}
//             className="px-4 py-2 bg-white text-gray-800 rounded-lg shadow-md focus:outline-none"
//           >
//             <option value="">Sort by</option>
//             <option value="new">New Movies</option>
//             <option value="top">Top Movies</option>
//             <option value="random">Random Movies</option>
//           </select>
//         </div>

//         {/* Movies Grid */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredMovies?.map((movie) => (
//             <MovieCard key={movie._id} movie={movie} />
//           ))}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AllMovies;
