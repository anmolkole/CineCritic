import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";

export const genreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGenre: builder.mutation({
      query: (newGenre) => ({
        url: `${GENRE_URL}`,
        method: "POST",
        body: newGenre,
      }),
    }),

    updateGenre: builder.mutation({
      query: ({ id, name }) => ({
        url: `${GENRE_URL}/${id}`,
        method: "PUT",
        body: { name },
      }),
    }),

    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `${GENRE_URL}/${id}`,
        method: "DELETE",
      }),
    }),

    fetchGenres: builder.query({
      query: () => `${GENRE_URL}/list`,
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useUpdateGenreMutation,
  useFetchGenresQuery,
} = genreApiSlice;
