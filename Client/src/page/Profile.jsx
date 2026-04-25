import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser } from "../reducer/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-orange-500 text-lg animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center">
      
      {/* Container */}
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 md:p-10 rounded-b-3xl shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
          <p className="text-sm opacity-80 mt-1">
            Manage your account details
          </p>
        </div>

        {/* Card */}
        <div className="px-4 md:px-0 -mt-10">
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">

            {/* Top Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              
              {/* Avatar */}
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center shadow-inner">
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

              {/* User Info */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800">
                  {user?.name || "User"}
                </h2>
                <p className="text-gray-500 mt-1">
                  {user?.mobile || "No mobile"}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t"></div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="bg-gray-50 rounded-xl p-4 hover:shadow transition">
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold text-gray-800">
                  {user?.name || "Not provided"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 hover:shadow transition">
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-semibold text-gray-800">
                  {user?.mobile || "Not provided"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 hover:shadow transition md:col-span-2">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-semibold text-gray-800">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

            </div>

            {/* Logout Button */}
            <div className="mt-8">
              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition"
              >
                Logout 🚪
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;