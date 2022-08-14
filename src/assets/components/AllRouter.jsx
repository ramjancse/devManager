import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'

function AllRouter() {
  return (
      <>
          <Routes>
              <Route to='/' element={ <Home />} />
              <Route to='/home' element={ <Home />} />
          </Routes>
      
      </>
  )
}

export default AllRouter