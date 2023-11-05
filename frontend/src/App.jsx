import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'

import Home from './pages/Home'
import Visuals from './pages/Visuals'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Visuals' element={<Visuals />} />
      </Routes>
    </div>

  )
}

export default App