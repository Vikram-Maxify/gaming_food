import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './page/HomePage'
// import BottomNav from './components/BottomNav'
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

function App() {
  return (
    <>
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
        

      </Routes>
      <TabStyle1 />

    </>
  )
}

export default App