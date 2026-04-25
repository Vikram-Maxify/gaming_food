import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser } from "../reducer/slice/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { 
  User, 
  Phone, 
  Calendar, 
  LogOut, 
  Edit2, 
  ShoppingBag, 
  Heart, 
  Settings,
  ChevronRight,
  Award,
  Clock
} from "lucide-react";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Mock order stats (replace with actual data from Redux)
  const orderStats = {
    totalOrders: 24,
    totalSpent: 3450,
    memberSince: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "January 2024",
    loyaltyPoints: 1250,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Something went wrong</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100 pb-8">
      
      {/* Header with Cover Image */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-orange-500 to-orange-600 rounded-b-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          
          {/* Edit Cover Button */}
          <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition">
            <Edit2 size={16} className="text-white" />
          </button>
        </div>

        {/* Profile Avatar - Overlapping the cover */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 md:left-8 md:translate-x-0">
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center overflow-hidden ring-4 ring-white">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </div>
            <button className="absolute bottom-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50 transition">
              <Edit2 size={12} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 mt-20 md:mt-24">
        
        {/* User Info Section */}
        <div className="text-center md:text-left md:flex md:justify-between md:items-start mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {user?.name || "Food Lover"}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
              <Phone size={14} className="text-gray-400" />
              <p className="text-gray-500">{user?.mobile || "+91 XXXXX XXXXX"}</p>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
              <Award size={14} className="text-orange-500" />
              <p className="text-sm text-orange-600 font-medium">{orderStats.loyaltyPoints} Loyalty Points</p>
            </div>
          </div>
          
          <button className="mt-4 md:mt-0 px-6 py-2 bg-orange-500 text-white rounded-full font-medium shadow-md hover:bg-orange-600 transition-all duration-300 hover:scale-105">
            Edit Profile
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md transition">
            <ShoppingBag size={24} className="text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{orderStats.totalOrders}</p>
            <p className="text-xs text-gray-500">Total Orders</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md transition">
            <span className="text-2xl block mb-1">💰</span>
            <p className="text-2xl font-bold text-gray-800">₹{orderStats.totalSpent}</p>
            <p className="text-xs text-gray-500">Total Spent</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md transition">
            <Heart size={24} className="text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">12</p>
            <p className="text-xs text-gray-500">Favorites</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md transition">
            <Clock size={24} className="text-orange-500 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-800">Member</p>
            <p className="text-xs text-gray-500">{orderStats.memberSince}</p>
          </div>
        </div>

        {/* Menu Options */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Account Settings</h3>
          </div>
          
          {[
            { icon: User, label: "Personal Information", color: "text-blue-500", bg: "bg-blue-50" },
            { icon: ShoppingBag, label: "Order History", color: "text-green-500", bg: "bg-green-50" },
            { icon: Heart, label: "Saved Items", color: "text-red-500", bg: "bg-red-50" },
            { icon: Settings, label: "App Settings", color: "text-purple-500", bg: "bg-purple-50" },
          ].map((item, idx) => (
            <button
              key={idx}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center`}>
                  <item.icon size={18} className={item.color} />
                </div>
                <span className="text-gray-700 group-hover:text-orange-500 transition">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-400 group-hover:text-orange-500 transition" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-3 p-4 hover:bg-red-50 transition-colors group"
          >
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <LogOut size={18} className="text-red-500" />
            </div>
            <span className="text-red-600 group-hover:text-red-700 font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full animate-slide-up overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut size={28} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Logout?</h3>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to logout? You'll need to login again to access your account.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;