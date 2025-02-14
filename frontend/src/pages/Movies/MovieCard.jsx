import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-64 h-80 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
      <Link to={`/movie/${movie._id}`} className="flex flex-col h-full">
        {/* Movie Image */}
        <img
          src={movie.image}
          alt={movie.name}
          className="w-full h-40 object-cover"
        />

        {/* Movie Details */}
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-lg font-semibold text-gray-800">{movie.name}</p>
          <p className="text-gray-600 text-sm overflow-hidden line-clamp-3">
            {movie.detail}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
