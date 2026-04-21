import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser } from "../reducer/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  // 🔥 Get user on load
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // 🔥 Logout handler
  const handleLogout = async () => {
    await dispatch(logoutUser());

    // agar token localStorage me hai
    localStorage.removeItem("token");

    navigate("/login");
  };

  // 🔹 Loading UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-orange-500 text-lg">Loading...</div>
      </div>
    );
  }

  // 🔹 Error UI
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* Header */}
      <div className="bg-orange-500 text-white p-6 rounded-b-3xl">
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-orange-500">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {user?.name || "User"}
              </h2>
              <p className="text-gray-500">
                {user?.mobile || "No mobile"}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-4 mt-6 space-y-4">

        {/* Email */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium text-gray-800">
            {user?.email || "Not provided"}
          </p>
        </div>

        {/* Phone */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium text-gray-800">
            {user?.mobile || "Not provided"}
          </p>
        </div>

        {/* Address */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-medium text-gray-800">
            {user?.address || "Not provided"}
          </p>
        </div>

        {/* Member Since */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Member Since</p>
          <p className="font-medium text-gray-800">
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

      </div>

      {/* 🔥 Logout Button */}
      <div className="px-4 mt-6 mb-10">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition"
        >
          Logout 🚪
        </button>
      </div>

    </div>
  );
};

export default Profile;