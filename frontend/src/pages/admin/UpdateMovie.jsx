import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useUpdateMovieMutation,
  useFindMovieQuery,
  //useUploadImageMutation,
  useDeleteMovieMutation,
  useCloudinaryUploadMutation,
} from "../../redux/api/movies.js";
import { toast } from "react-toastify";
import { useFetchGenresQuery } from "../../redux/api/genre.js";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
    genre: "",
    publicId: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useFindMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();

  const [uploadImage, { isLoading: isUploadingImage }] =
    useCloudinaryUploadMutation();

  const [deleteMovie, { isLoading: isDeleteingMovie }] =
    useDeleteMovieMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleGenreChange = (e) => {
    setMovieData((prevData) => ({
      ...prevData,
      genre: e.target.value,
    }));
  };

  const handleUpdateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !movieData.genre
      ) {
        toast.error("All fields except image are required!");
        return;
      }

      let uploadedImageUrl = movieData.image; // Keep existing image if none is uploaded
      let uploadedPublicId = movieData.publicId; // Preserve previous publicId

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        // Debugging: Log FormData contents
        for (const pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }

        const uploadResponse = await uploadImage(formData).unwrap();
        console.log("Upload response:", uploadResponse);
        console.log(uploadResponse.imageUrl);

        if (uploadResponse.imageUrl) {
          uploadedImageUrl = uploadResponse.imageUrl;
          uploadedPublicId = uploadResponse.publicId;
        } else {
          toast.error("Image upload failed.");
          return;
        }
      }

      const updatedResponse = await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          image: uploadedImageUrl,
          publicId: uploadedPublicId,
        },
      }).unwrap();
      toast.success("Movie updated successfully!");
      navigate("/admin/movies-list");
    } catch (error) {
      console.error("Error in handleUpdate:", error);
      toast.error("Failed to update movie.");
    }
  };

  const handleDeleteMovie = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!isConfirmed) return;
    try {
      await deleteMovie(id);
      navigate("/admin/movies-list");
      toast.success("Movie Deleted Successfully");
    } catch (error) {
      console.error("Failed to delete movie:", error);
      toast.error("Failed to delete movie");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[100vh] bg-gray-100 pb-20">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Update Movie
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={movieData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="block text-gray-700">Year</label>
              <input
                type="number"
                name="year"
                value={movieData.year}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="block text-gray-700">
                Cast (comma-separated)
              </label>
              <input
                type="text"
                name="cast"
                value={movieData.cast}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="block text-gray-700">Genre</label>
              <select
                name="genre"
                value={movieData.genre}
                onChange={handleGenreChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200"
              >
                {isLoadingGenres ? (
                  <option>Loading genres...</option>
                ) : (
                  genres.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Detail</label>
              <textarea
                name="detail"
                value={movieData.detail}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200 h-49.5"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full flex gap-4 justify-between">
          <button
            type="button"
            onClick={handleUpdateMovie}
            disabled={isUpdatingMovie || isUploadingImage}
            className="w-1/2 mt-6 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            {isUpdatingMovie || isUploadingImage
              ? "Updating..."
              : "Update Movie"}
          </button>

          <button
            type="button"
            onClick={handleDeleteMovie}
            disabled={isDeleteingMovie || isUpdatingMovie || isUploadingImage}
            className="w-1/2 mt-6 bg-red-600 text-white py-2 rounded-lg hover:bg-red-400 disabled:opacity-50"
          >
            {isDeleteingMovie || isUpdatingMovie || isUploadingImage
              ? "Deleting..."
              : "Delete Movie"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovie;
