import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-gray-800 text-white shadow-lg">
      <aside className="p-6">
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/dashboard"
              className="block p-3 rounded-lg hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              className="block p-3 rounded-lg hover:bg-gray-700"
            >
              All Movies
            </Link>
          </li>
          <li>
            <Link
              to="/admin/movies/create"
              className="block p-3 rounded-lg hover:bg-gray-700"
            >
              Create Movie
            </Link>
          </li>
          <li>
            <Link
              to="/admin/movies-list"
              className="block p-3 rounded-lg hover:bg-gray-700"
            >
              Update Movie
            </Link>
          </li>
          <li>
            <Link
              to="/admin/movies/genre"
              className="block p-3 rounded-lg hover:bg-gray-700"
            >
              Create Genre
            </Link>
          </li>
          <li>
            <Link
              to="/admin/movies/comments"
              className="block p-3 rounded-lg hover:bg-gray-700"
            >
              Comments
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
