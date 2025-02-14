import { Link, useLocation } from "react-router-dom";

const VideoCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`} state={{ from: "admin/dashboard" }}>
      <div className="p-4 bg-white shadow-lg rounded-lg flex justify-between">
        {/* Movie Image & Info */}
        <div className="flex items-center ml-12 gap-4">
          <img
            src={movie.image}
            alt={movie.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div>
            <h2 className="text-lg font-bold">{movie.name}</h2>
            <h2 className="text-lg font-bold">{movie.year}</h2>
          </div>
        </div>

        {/* Number of Reviews */}
        <div className="text-lg mr-18 font-semibold text-gray-700">
          {movie.numReviews}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
