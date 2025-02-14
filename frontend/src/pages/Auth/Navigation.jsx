import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import { HiHome } from "react-icons/hi2";
import { MdLocalMovies } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";
import { TiUserAdd } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => setDropDownOpen(!dropDownOpen);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
      <nav className="bg-[#1E88E5] text-white shadow-lg rounded-full flex justify-between items-center py-3 px-6">
        {/* Left Section - Navigation Links */}
        <div className="flex gap-6">
          <Link
            to="/"
            className="flex flex-col items-center hover:text-gray-200 transition duration-300"
          >
            <HiHome size={28} />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/movies"
            className="flex flex-col items-center hover:text-gray-200 transition duration-300"
          >
            <MdLocalMovies size={28} />
            <span className="text-xs">Movies</span>
          </Link>
        </div>

        {/* Right Section - User Dropdown */}
        <div className="relative">
          {userInfo ? (
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 hover:text-gray-200 transition duration-300"
            >
              <FaUserCircle size={22} />
              <span className="text-sm font-semibold">
                {userInfo.username.toUpperCase()}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  dropDownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="flex flex-col items-center hover:text-gray-200 transition duration-300"
              >
                <TbLogin2 size={28} />
                <span className="text-xs">Login</span>
              </Link>
              <Link
                to="/register"
                className="flex flex-col items-center hover:text-gray-200 transition duration-300"
              >
                <TiUserAdd size={28} />
                <span className="text-xs">Register</span>
              </Link>
            </div>
          )}

          {/* Dropdown Menu */}
          {dropDownOpen && userInfo && (
            <ul className="absolute right-0 bottom-full mb-2 w-44 bg-gray-800 text-white shadow-md rounded-lg py-2 transition-opacity duration-300">
              {userInfo.isAdmin && (
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-700 transition duration-300"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-700 transition duration-300"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
