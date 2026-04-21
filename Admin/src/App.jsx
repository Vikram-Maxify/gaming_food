import './App.css'
import AdminLayout from './layout/AdminLayout'
import Dashboard from './pages/Dashboard'
import { Routes, Route } from "react-router-dom";
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


function App() {

  return (
    <>
      <Routes>
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
          <Route path="schef_Dash" element={<ShefDashboard />} />
          <Route path="coins_mng" element={<CoinManage />} />
          <Route path="add_item" element={<AddProduct />} />
          <Route path="categories" element={<AdminCategory />} />
          <Route path='order' element={<AdminOrders />} />
          <Route path='otpsetting' element={<AdminOtpSettings />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </>
  )
}

export default App
