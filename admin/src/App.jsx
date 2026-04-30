import './App.css'
import AdminLayout from './layout/AdminLayout'
import Dashboard from './pages/Dashboard'
import { Routes, Route, Navigate } from "react-router-dom";
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Settings from './pages/Settings';
import ShefDashboard from './pages/ShefDashboard';
import CoinManage from './pages/CoinManage';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './redux/ProtectedRoute';
import AddProduct from './pages/AddProduct';
import AdminCategory from './pages/AdminCategory';
import AdminOrders from './pages/AdminOrders';
import AdminOtpSettings from './pages/AdminOtpSettings';
import TableManage from './pages/TableManage';
import AdminProfile from './pages/AdminProfile';
import BannerManager from './component/BannerManager';
import ChefList from "./pages/ChefList"


function App() {
  return (
    <>
      <Routes>

        {/* ✅ Root pe redirect */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="baner_mng" element={<BannerManager />} />
          <Route path="schef_Dash" element={<ShefDashboard />} />
          <Route path="coins_mng" element={<CoinManage />} />
          <Route path="add_item" element={<AddProduct />} />
          <Route path="categories" element={<AdminCategory />} />
          <Route path="otpsetting" element={<AdminOtpSettings />} />
          <Route path="table" element={<TableManage />} />
          <Route path="create_chef" element={<ChefList />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

      </Routes>
    </>
  );
}

export default App
