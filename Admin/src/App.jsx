import './App.css'
import AdminLayout from './layout/AdminLayout'
import Dashboard from './pages/Dashboard'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminLayout />} />
        <Route index element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
