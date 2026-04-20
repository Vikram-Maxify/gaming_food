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

function App() {

  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="schef_Dash" element={<ShefDashboard />} />
          <Route path="coins_mng" element={<CoinManage />} />
          {/* <Route path="categories" element={<ategories />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default App
