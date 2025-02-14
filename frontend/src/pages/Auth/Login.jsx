import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/users.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();
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

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Logged in Successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 pb-20 bg-[#EAF2FF]">
      <div className="flex flex-col lg:flex-row bg-white shadow-xl rounded-xl overflow-hidden max-w-4xl w-full">
        {/* Left: Login Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-2xl font-bold text-center mb-4 text-[#1E88E5]">
            Sign In
          </h1>
          <form onSubmit={submitHandler} className="space-y-4">
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

            <button
              disabled={isLoading}
              type="submit"
              className="w-full p-2 bg-[#1E88E5] text-white rounded hover:bg-[#1565C0] transition disabled:bg-gray-400"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="text-center mt-4">
            <p className="text-sm">
              New here?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-[#1E88E5] hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Right: Image (Hidden on Mobile) */}
        <div className="hidden lg:flex w-1/2 justify-center items-center ">
          <img
            src="/movie6.avif"
            alt="Login Illustration"
            className="w-full max-h-90 object-cover shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
