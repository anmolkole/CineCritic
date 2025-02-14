import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useProfileMutation } from "../../redux/api/users";
import { useNavigate } from "react-router";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [username, setUsername] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  // Checks if user made changes
  const hasChanges =
    username !== userInfo.username ||
    email !== userInfo.email ||
    password.trim() !== "";

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!hasChanges) {
      toast.info("Profile Updated Successfully");
      navigate("/");
      return;
    }

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      toast.success("Profile Updated Successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EAF2FF] ">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-[#1E88E5] ">
          Update Profile
        </h2>
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-[#1E88E5] focus:border-[#1E88E5] outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-[#1E88E5] focus:border-[#1E88E5] outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password (optional)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-[#1E88E5] focus:border-[#1E88E5] outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-[#1E88E5] focus:border-[#1E88E5] outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loadingUpdateProfile}
            className="w-full p-3 bg-[#1E88E5] text-white font-semibold rounded-lg hover:bg-[#1565C0] transition disabled:bg-gray-400"
          >
            {loadingUpdateProfile ? "Updating..." : "Update Profile"}
          </button>

          {loadingUpdateProfile && <Loader />}
        </form>
      </div>
    </div>
  );
};

export default Profile;
