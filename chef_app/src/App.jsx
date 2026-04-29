import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chefProfile } from "./redux/slice/chefAuthSlice";
import ChefLogin from "./pages/ChefLogin";
import Orders from "./pages/Orders";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.chef);

  useEffect(() => {
    dispatch(chefProfile());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">

      {/* PUBLIC ROUTE */}
      {!isAuthenticated ? (
        <ChefLogin />
      ) : (
        <PrivateRoute>
          <div>

            {/* HEADER */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h1 className="text-xl font-bold">
                👨‍🍳 Chef Dashboard
              </h1>
            </div>

            {/* ORDERS */}
            <Orders />

          </div>
        </PrivateRoute>
      )}

    </div>
  );
}

export default App;