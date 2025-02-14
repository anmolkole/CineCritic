import { apiSlice } from "./apiSlice";
import { CLOUDINARY_UPLOAD_URL, MOVIE_URL, UPLOAD_URL } from "../constants";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listMovies: builder.query({
      query: () => `${MOVIE_URL}/all-movies`,
    }),

    createMovie: builder.mutation({
      query: (newMovie) => ({
        url: `${MOVIE_URL}/create-movie`,
        method: "POST",
        body: newMovie,
      }),
    }),

    updateMovie: builder.mutation({
      query: ({ id, updatedMovie }) => ({
        url: `${MOVIE_URL}/update/${id}`,
        method: "PUT",
        body: updatedMovie,
      }),
    }),

    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIE_URL}/${id}/reviews`,
        method: "POST",
        body: { rating, id, comment },
      }),
    }),

    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/delete-movie/${id}`,
        method: "DELETE",
      }),
    }),

    deleteComment: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIE_URL}/delete-comment`,
        method: "DELETE",
        body: { movieId, reviewId },
        headers: { "Content-Type": "application/json" },
      }),
    }),

    findMovie: builder.query({
      query: (id) => `${MOVIE_URL}/movie/${id}`,
    }),

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData,
      }),
    }),

    cloudinaryUpload: builder.mutation({
      query: (formData) => ({
        url: `${CLOUDINARY_UPLOAD_URL}`,
        method: "POST",
        body: formData,
      }),
    }),

    newMovies: builder.query({
      query: () => `${MOVIE_URL}/new-movies`,
    }),

    topMovies: builder.query({
      query: () => `${MOVIE_URL}/top-movies`,
    }),

    randomMovies: builder.query({
      query: () => `${MOVIE_URL}/random-movies`,
    }),
  }),
});

export const {
  useListMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useAddMovieReviewMutation,
  useDeleteCommentMutation,
  useDeleteMovieMutation,
  useFindMovieQuery,
  //
  useNewMoviesQuery,
  useTopMoviesQuery,
  useRandomMoviesQuery,
  //
  useUploadImageMutation,
  useCloudinaryUploadMutation,
} = moviesApiSlice;
