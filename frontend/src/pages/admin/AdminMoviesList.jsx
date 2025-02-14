import { Link, useNavigate } from "react-router-dom";
import { useListMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const navigate = useNavigate();
  const { data: movies, isLoading, error } = useListMoviesQuery();

  if (isLoading)
    return <p className="text-center text-gray-600">Loading movies...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load movies.</p>;

  return (
    <div className="p-6 flex justify-center">
      <div className="max-w-6xl w-full">
        <div className="mb-4 text-xl font-semibold text-gray-700">
          All Movies ({movies?.length})
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies?.map((movie) => (
            <div
              key={movie._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* <Link to={`/admin/movies/update/${movie._id}`}> */}
              <div
                className="relative"
                onClick={() => navigate(`/admin/movies/update/${movie._id}`)}
              >
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {movie.name}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {movie.detail}
                  </p>
                  <div className="mt-2">
                    <Link
                      to={`/admin/movies/update/${movie._id}`}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      Update Movie
                    </Link>
                  </div>
                </div>
              </div>
              {/* </Link> */}
            </div>
          ))}
          <div className="h-20"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;
