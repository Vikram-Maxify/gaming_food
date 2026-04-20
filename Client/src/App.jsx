import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './page/HomePage'
import BottomNav from './components/BottomNav'
import Login from './page/Login'
import Register from './page/Register'
import Profile from './page/Profile'
import TicTacToe from './page/ticTacToe'
import Ludo from './page/Ludo'
import CarRace from './page/CarRace'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <HomePage />
          }
        />
        <Route
          path='/login'
          element={
            <Login />
          }
        />
        <Route
          path='/register'
          element={
            <Register />
          }
        />
        <Route
          path='/tictactoe'
          element={
            <TicTacToe />
          }
        />
        <Route path="/ludo" element={<Ludo />} />
        <Route path='/car' element={<CarRace />} />
        <Route
          path='/profile'
          element={
            <Profile />
          }
        />
      </Routes>

      <BottomNav />
    </>
  )
}

export default App
