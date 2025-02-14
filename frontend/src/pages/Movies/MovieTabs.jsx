import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md ">
      {/* Comment Form */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Write a Review</h3>
        {userInfo ? (
          <form onSubmit={submitHandler} className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Your Comment
            </label>
            <textarea
              id="comment"
              rows="3"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            ></textarea>
            <button
              type="submit"
              className="mt-3 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition duration-200"
            >
              Submit
            </button>
          </form>
        ) : (
          <p className="text-sm text-gray-600 mt-2">
            Please{" "}
            <Link to={"/login"} className="text-blue-600">
              Sign In
            </Link>{" "}
            to write a review.
          </p>
        )}
      </section>

      {/* Reviews List */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reviews</h3>
        {movie?.reviews.length === 0 ? (
          <p className="text-gray-500">No Reviews</p>
        ) : (
          <div className="space-y-4">
            {movie?.reviews.map((review) => (
              <div key={review._id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <strong className="text-gray-800">{review.name}</strong>
                  <p className="text-gray-500 text-sm">
                    {review.createdAt.substring(0, 10)}
                  </p>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))}
            <div className="h-20"></div>
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieTabs;
