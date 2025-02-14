import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";

import { toast } from "react-toastify";
import GenreForm from "../../components/GenreForm";
import Model from "../../components/Model";

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modelVisible, setModelVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  // Create Genre
  const handleCreateGenre = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Genre Name is Required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is Created`);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update Genre
  const handleUpdateGenre = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Genre Name is Required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        name: updatingName,
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModelVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Genre
  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Genre Deleted Successfully");
        refetch();
        setSelectedGenre(null);
        setModelVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6  rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold font-grey-900  mb-4">
        Manage Genres
      </h1>

      {/* Genre Form to Create New Genre */}
      <GenreForm
        value={name}
        setValue={setName}
        handleSubmit={handleCreateGenre}
      />

      {/* Display List of Genres */}
      <div className="mt-6 flex flex-wrap gap-3">
        {genres?.map((genre) => (
          <button
            key={genre._id}
            onClick={() => {
              setModelVisible(true);
              setSelectedGenre(genre);
              setUpdatingName(genre.name);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Modal for Updating/Deleting Genre */}
      <Model isOpen={modelVisible} onClose={() => setModelVisible(false)}>
        <h2 className="text-xl font-semibold text-center mb-3">Edit Genre</h2>
        <GenreForm
          value={updatingName}
          setValue={setUpdatingName}
          handleSubmit={handleUpdateGenre}
          buttonText="Update"
          handleDelete={handleDeleteGenre}
        />
      </Model>
    </div>
  );
};

export default GenreList;
