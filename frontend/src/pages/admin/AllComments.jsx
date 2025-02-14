import {
  useDeleteCommentMutation,
  useListMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const AllComments = () => {
  const { data: movies, refetch } = useListMoviesQuery();
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId }).unwrap();
      toast.success("Comment Deleted Successfully");
      refetch();
    } catch (error) {
      console.error("Error Deleting Comment", error);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        All Movie Comments
      </h2>

      {movies
        ?.filter((movie) => movie.reviews.length > 0) // ✅ Only show movies with comments
        .map((movie) => (
          <div
            key={movie._id}
            className="mb-8 bg-white shadow-md rounded-lg p-4"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {movie.name}
            </h3>

            {movie.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-100 p-4 rounded-lg mb-3 flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-gray-900">{review.name}</strong>
                    <span className="text-sm text-gray-500">
                      {review.createdAt.substring(0, 10)}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
                <button
                  onClick={() => handleDeleteComment(movie._id, review._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default AllComments;
