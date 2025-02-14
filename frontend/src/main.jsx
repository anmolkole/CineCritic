import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";

//Auth
import AdminRoute from "./pages/admin/AdminRoute.jsx";
//Restricted
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import PrivateRoute from "./pages/Auth/PrivateRoute.jsx";
import GenreList from "./pages/admin/GenreList.jsx";
import CreateMovie from "./pages/admin/CreateMovie.jsx";
import AdminMoviesList from "./pages/admin/AdminMoviesList.jsx";
import UpdateMovie from "./pages/admin/UpdateMovie.jsx";
import Profile from "./pages/User/Profile.jsx";

import Home from "./pages/Home.jsx";
import AllMovies from "./pages/Movies/AllMovies.jsx";
import MovieDetail from "./pages/Movies/MovieDetail.jsx";
import AllComments from "./pages/admin/AllComments.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/movies" element={<AllMovies />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/movies/create" element={<CreateMovie />} />
        <Route path="/admin/movies/genre" element={<GenreList />} />
        <Route path="/admin/movies/update/:id" element={<UpdateMovie />} />
        <Route path="/admin/movies-list" element={<AdminMoviesList />} />
        <Route path="/admin/movies/comments" element={<AllComments />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
