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

function App() {
  return (
    <>
      <ScrollToTop />
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
          {/* Games */}

          <Route path='/tictactoe' element={<TicTacToe />} />
          <Route path="/ludo" element={<Ludo />} />
          <Route path='/car' element={<CarRace />} />
        </Route>

        {/* footer  */}
        <Route path='/terms' element={<TermsOfServices />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/security' element={<Security />} />
        <Route path='/help' element={<HelpAndSupport />} />
      </Routes>
      <TabStyle1 />

    </>
  )
}

export default App