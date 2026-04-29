import { useDispatch } from "react-redux";
import { chefLogout } from "../redux/slice/chefAuthSlice";
import { useNavigate } from "react-router-dom";

const ChefNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await dispatch(chefLogout());

      if (res?.payload?.success || res?.type?.includes("fulfilled")) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-between px-5 py-3 bg-[#111] border-b border-gray-800">

      {/* Title */}
      <h1 className="text-lg font-bold text-white">
        👨‍🍳 Chef Dashboard
      </h1>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>

    </div>
  );
};

export default ChefNavbar;