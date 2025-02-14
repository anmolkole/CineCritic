import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useFindMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies.js";
import MovieTabs from "./MovieTabs.jsx";
import { toast } from "react-toastify";

const MovieDetail = () => {
  const { id: movieId } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: movie, refetch } = useFindMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: isLoadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();
      setComment("");

      refetch();
      toast.success("Review Posted Successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100">
      {/* Back Button */}
      <div className="w-full max-w-5xl px-4 py-4">
        <Link
          to={-1}
          className="text-gray-600 hover:text-gray-800 text-sm font-medium"
        >
          ← Go Back
        </Link>
      </div>

      {/* Movie Content */}
      <div className="max-w-5xl w-full flex flex-col items-center">
        {/* Movie Image */}
        <img
          src={movie?.image}
          alt={movie?.name}
          className="w-[90%] h-auto max-h-[500px] rounded-lg shadow-md"
        />

        {/* Movie Details & Cast in One Row */}
        <div className="w-[90%] max-w-5xl flex mt-6 gap-6">
          {/* Movie Details (Left - 70%) */}
          <div className="w-[70%] bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800">{movie?.name}</h2>
            <p className="text-gray-600 text-sm mt-2">{movie?.detail}</p>
            <p className="text-gray-500 text-sm mt-2">
              Released In: {movie?.year}
            </p>
          </div>

          {/* Cast Section (Right - 30%) */}
          <div className="w-[30%] bg-white p-4 rounded-lg shadow-md  overflow-y-auto">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Cast</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {movie?.cast.map((c) => (
                <span
                  key={c._id}
                  className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Comment Section (Below Movie Details & Cast) */}
        <div className="w-[90%] max-w-5xl mt-8">
          <MovieTabs
            loadingMovieReview={isLoadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
