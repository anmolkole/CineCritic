import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/users.js";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("User Registered Successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 pb-20 bg-[#EAF2FF]">
      <div className="flex flex-col lg:flex-row bg-white shadow-xl rounded-xl overflow-hidden max-w-4xl w-full">
        {/* Left: Registration Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-[#1E88E5] mb-6 text-center lg:text-left">
            Register
          </h1>
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={username}
                placeholder="Enter Name"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 p-2 border border-[#d3d3d3] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E88E5]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border border-[#d3d3d3] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E88E5]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border border-[#d3d3d3] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E88E5]"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 p-2 border border-[#d3d3d3] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1E88E5]"
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full p-2 bg-[#1E88E5] text-white rounded hover:bg-[#1565C0] transition disabled:bg-gray-400"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-[#1E88E5] hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-1/2 hidden lg:flex justify-center items-center">
          <img
            src="/movie6.avif"
            height={200}
            width={200}
            alt="Register Illustration"
            className="w-full max-h-133 object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
