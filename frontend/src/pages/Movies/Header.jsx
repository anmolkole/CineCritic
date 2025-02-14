import { Link } from "react-router-dom";
import PaymentBbutton from "../admin/PaymentButton";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-gray-800">
          🍿 MOVIES FLIX
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6">
          <Link to="/movies">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition duration-200">
              Browse Movies
            </button>
          </Link>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition duration-200">
            <PaymentBbutton />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
