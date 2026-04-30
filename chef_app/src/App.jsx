import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chefProfile } from "./redux/slice/chefAuthSlice";
import { Routes, Route, Navigate } from "react-router-dom";

import ChefLogin from "./pages/ChefLogin";
import PrivateRoute from "./components/PrivateRoute";

// Layout
import ChefLayout from "./pages/Layout";

// Pages
import Orders from "./pages/Orders";
import CompleatedOrders from "./pages/CompleatedOrders";
import ChefProfile from "./pages/ChefProfile";

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

      <Routes>

        {/* 🔓 PUBLIC ROUTE */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <ChefLogin />
            ) : (
              <Navigate to="/chef/live-orders" />
            )
          }
        />

        {/* 🔐 PRIVATE ROUTES */}
        <Route
          path="/chef"
          element={
            <PrivateRoute>
              <ChefLayout />
            </PrivateRoute>
          }
        >
          <Route path="live-orders" element={<Orders />} />
          <Route path="completed-orders" element={<CompleatedOrders />} />
          <Route path="profile" element={<ChefProfile />} />

          {/* Default redirect */}
          <Route index element={<Navigate to="live-orders" />} />
        </Route>

        {/* 🔁 FALLBACK */}
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/chef/live-orders" : "/login"} />
          }
        />

      </Routes>

    </div>
  );
}

export default App;