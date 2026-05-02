import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './page/HomePage'
import Login from './page/Login'
import Register from './page/Register'
import Profile from './page/Profile'
import TicTacToe from './page/ticTacToe'
import Ludo from './page/Ludo'
import CarRace from './page/CarRace'
import MenuPage from './page/MenuPage'
import AddToCart from './page/AddToCart'
import PrivateRoute from './page/PrivateRoute' // 🔥 ADD
import TabStyle1 from './components/BottomNav'
import TermsOfServices from './page/TermsOfServices'
import Privacy from './page/Privacy'
import Security from './page/Security'
import ScrollToTop from './components/ScrollToTop'
import HelpAndSupport from './page/HelpAndSupport'
import About from './page/About'
import Navbar from './components/Navbar'
import CakeTower from './page/CakeTower'
import FruitNinjaPro from './page/FruitNinjaPro'
import ShootingGame from './page/ShootingGame'
import OrderHistory from './page/OrderHistory'
import OrderStatusBanner from './components/OrderStatusBanner'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* 🔓 PUBLIC ROUTES */}
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />


        {/* 🔐 PRIVATE ROUTES */}
        <Route element={<PrivateRoute />}>

          <Route path='/menu' element={<MenuPage />} />
          <Route path='/cart' element={<AddToCart />} />
          <Route path='/profile' element={<Profile />} />

          {/*Profile page routes */}

          <Route path="/orders" element={<OrderHistory />} />
        
          {/* Games */}

          <Route path='/tictactoe' element={<TicTacToe />} />
          <Route path="/ludo" element={<Ludo />} />
          <Route path='/car' element={<CarRace />} />
          <Route path='/cake' element={<CakeTower />} />
          <Route path='/ninja' element={<FruitNinjaPro />} />
          <Route path='/shoot' element={<ShootingGame />} />
        </Route>

        {/* footer  */}
        <Route path='/terms' element={<TermsOfServices />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/security' element={<Security />} />
        <Route path='/help' element={<HelpAndSupport />} />
        <Route path='/about' element={<About />} />


      </Routes>
      <OrderStatusBanner /> 
      <TabStyle1 />

    </>
  )
}

export default App