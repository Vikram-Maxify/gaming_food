import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './page/HomePage'

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
    </Routes>
    </>
  )
}

export default App
