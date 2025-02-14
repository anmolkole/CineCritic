import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  //useUploadImageMutation,
  useCloudinaryUploadMutation,
} from "../../redux/api/movies.js";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: "",
    detail: "",
    cast: "",
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [createMovie, { isLoading: isCreatingMovie }] =
    useCreateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage }] =
    useCloudinaryUploadMutation();
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres?.length) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenreChange = (e) => {
    setMovieData((prevData) => ({
      ...prevData,
      genre: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // const handleCreateMovie = async () => {
  //   try {
  //     if (
  //       !movieData.name ||
  //       !movieData.year ||
  //       !movieData.detail ||
  //       !movieData.cast ||
  //       !selectedImage
  //     ) {
  //       toast.error("All fields are required");
  //       return;
  //     }

  //     let uploadedImagePath = null;

  //     if (selectedImage) {
  //       const formData = new FormData();
  //       formData.append("image", selectedImage);

  //       const uploadImageResponse = await uploadImage(formData).unwrap();
  //       uploadedImagePath = uploadImageResponse.image;
  //     }

  //     await createMovie({ ...movieData, image: uploadedImagePath });

  //     toast.success("New Movie Added");

  //     navigate("/admin/movies-list");

  //     setMovieData({
  //       name: "",
  //       year: "",
  //       detail: "",
  //       cast: "",
  //       rating: 0,
  //       image: null,
  //       genre: genres?.[0]?._id || "",
  //     });
  //   } catch (error) {
  //     console.error("Failed to create movie:", error);
  //     toast.error("Failed to create movie");
  //   }
  // };

  const handleCreateMovieWithCloudinary = async () => {
    try {
      if (!selectedImage) {
        toast.error("Please upload an image first");
        return;
      }

      // Step 1: Upload image to Cloudinary
      const formData = new FormData();
      formData.append("image", selectedImage);

      const uploadResponse = await uploadImage(formData).unwrap();
      if (!uploadResponse.imageUrl || !uploadResponse.publicId) {
        toast.error("Image upload failed");
        return;
      }

      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !movieData.genre ||
        !selectedImage
      ) {
        toast.error("All fields are required");
        return;
      }

      // Send Movie Data with Image URL
      await createMovie({
        ...movieData,
        image: uploadResponse.imageUrl,
        publicId: uploadResponse.publicId,
      });

      toast.success("New Movie Added Successfully");
      navigate("/admin/movies-list");

      // Reset Form
      setMovieData({
        name: "",
        year: "",
        detail: "",
        cast: "",
        genre: genres?.[0]?._id || "",
        image: null,
      });
      setSelectedImage(null);
    } catch (error) {
      console.error("Failed to create movie:", error);
      toast.error("Failed to create movie");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[100vh] bg-gray-100 pb-20">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Create Movie
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
        <button
          type="button"
          onClick={handleCreateMovieWithCloudinary}
          disabled={isCreatingMovie || isUploadingImage}
          className="w-full mt-6 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
        >
          {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
        </button>
      </div>
    </div>
  );
};

export default CreateMovie;
